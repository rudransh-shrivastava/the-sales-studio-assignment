import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "../../../../auth";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const couponId = new URL(req.url).searchParams.get("couponId");

  if (!couponId || couponId == "") {
    return NextResponse.json(
      { error: "Coupon ID is required" },
      { status: 400 },
    );
  }

  try {
    // Fetch coupon history from the database
    const history = await prisma.claimHistory.findMany({
      where: {
        couponId: couponId,
      },
    });
    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error("Error fetching claim history:", error);
    return NextResponse.json(
      { error: "Failed to fetch claim history" },
      { status: 500 },
    );
  }
}
