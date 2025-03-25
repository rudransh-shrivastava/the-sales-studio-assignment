import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const COOLDOWN_PERIOD = 1000 * 60; // 1 minute
export async function POST(req: Request) {
  const { couponCode } = await req.json();
  if (!couponCode) {
    return NextResponse.json(
      { error: "Coupon code is required" },
      { status: 400 },
    );
  }

  const ip = req.headers.get("x-forwarded-for");
  console.log(ip);

  // TODO: do it here

  const coupon = await prisma.coupon.findFirst({
    where: {
      code: couponCode,
    },
  });

  if (!coupon) {
    return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
  }
  if (!coupon.isActive) {
    return NextResponse.json(
      {
        error:
          "Coupon is not active (generally we would not tell the client this but its ok in this example for testing purposes only)",
      },
      { status: 400 },
    );
  }

  const cooldownThreshold = new Date(Date.now() - COOLDOWN_PERIOD);
  const existingIpClaim = await prisma.claimHistory.findFirst({
    where: {
      couponId: coupon.id,
      ipAddress: ip as string,
      createdAt: { gte: cooldownThreshold },
    },
  });

  if (existingIpClaim) {
    return NextResponse.json(
      { error: "You have already claimed this coupon, please try again later" },
      { status: 400 },
    );
  }

  // Else we create a new claim history

  return NextResponse.json(
    { message: "Coupon claimed successfully!" },
    { status: 200 },
  );
}
