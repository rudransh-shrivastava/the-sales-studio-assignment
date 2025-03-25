import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const COOLDOWN_PERIOD = 1000 * 60; // 1 minute
const BROWSER_SESSION_COOKIE = "coupon_browser_session";

export async function POST(req: Request) {
  const { couponCode } = await req.json();
  if (!couponCode) {
    return NextResponse.json(
      { error: "Coupon code is required" },
      { status: 400 },
    );
  }

  const ip = req.headers.get("x-forwarded-for");
  if (!ip) {
    return NextResponse.json(
      { error: "IP address not found" },
      { status: 400 },
    );
  }

  const browserSessionId = req.headers.get(BROWSER_SESSION_COOKIE) || uuidv4();

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
      ipAddress: ip,
      createdAt: { gte: cooldownThreshold },
    },
  });

  const existingSessionClaim = await prisma.claimHistory.findFirst({
    where: {
      couponId: coupon.id,
      browserSessionId: browserSessionId,
      createdAt: { gte: cooldownThreshold },
    },
  });

  if (existingIpClaim || existingSessionClaim) {
    return NextResponse.json(
      {
        error:
          "You have recently claimed this coupon, please try again in 60 seconds",
      },
      { status: 400 },
    );
  }

  // Else we create a new claim history
  const claimRecord = await prisma.claimHistory.create({
    data: {
      ipAddress: ip,
      browserSessionId: browserSessionId,
      couponId: coupon.id,
    },
  });
  const response = NextResponse.json(
    { message: "Coupon claimed successfully!", claimRecord },
    { status: 200 },
  );

  response.headers.set(BROWSER_SESSION_COOKIE, browserSessionId);

  return response;
}
