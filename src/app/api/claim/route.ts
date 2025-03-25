import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { couponCode } = await req.json();
  if (!couponCode) {
    return NextResponse.json(
      { error: "Coupon code is required" },
      { status: 400 },
    );
  }

  const forwarded = req.headers.get("x-forwarded-for");
  console.log(forwarded);

  return NextResponse.json(
    { message: `Coupon claimed successfully! forwaded = > ${forwarded}` },
    { status: 200 },
  );
}
