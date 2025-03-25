export type Coupon = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  ClaimHistory: [
    {
      id: string;
      ipAddress: string;
      browserSessionId: string;
      createdAt: string;
      couponId: string;
    },
  ];
};
