import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "../../../../auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Fetch all coupons from the database
    const coupons = await prisma.coupon.findMany();
    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, code } = body;
    if (!name || name == "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!code || code == "") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }
    // Create the new coupon
    const newCoupon = await prisma.coupon.create({
      data: {
        name,
        code,
      },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, name, code } = body;

    if (!name || name == "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!code || code == "") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Update the coupon with the given id
    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        name,
        code,
      },
    });

    return NextResponse.json(updatedCoupon, { status: 200 });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const id = new URL(req.url).searchParams.get("couponId");
  if (!id) {
    return NextResponse.json(
      { error: "couponId is required" },
      { status: 400 },
    );
  }
  try {
    // First, delete all claim history associated with the coupon
    await prisma.claimHistory.deleteMany({
      where: { couponId: id },
    });

    // Then delete the coupon itself
    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting coupon and claim history:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 },
    );
  }
}
