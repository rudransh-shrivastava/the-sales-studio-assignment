import { Coupon, columns } from "./columns";
export default async function Page() {
  const coupons: Coupon[] = [
    {
      id: "728ed52f",
      name: "Hello first coupon",
      code: "XYZ",
      isClaimed: false,
      isActive: true,
      claimedAt: "2022-01-01",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
      ClaimHistory: [
        {
          id: "1",
          ipAddress: "123.555.33.2",
          browserSessionId: "123.555.33.2",
          createdAt: "2022-01-01",
          couponId: "728ed52f",
        },
      ],
    },
    {
      id: "489e1d42",
      name: "Hello second coupon",
      code: "XYZ",
      isClaimed: false,
      isActive: true,
      claimedAt: "2022-01-01",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
      ClaimHistory: [
        {
          id: "1",
          ipAddress: "123.555.33.2",
          browserSessionId: "123.555.33.2",
          createdAt: "2022-01-01",
          couponId: "489e1d42",
        },
      ],
    },
  ];
  return (
    <div className="container mx-auto py-10">{/* display table here */}</div>
  );
}
