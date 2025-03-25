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

export const emptyCoupon: Coupon = {
  id: "",
  name: "",
  code: "",
  isActive: false,
  createdAt: "",
  updatedAt: "",
  ClaimHistory: [
    {
      id: "",
      ipAddress: "",
      browserSessionId: "",
      createdAt: "",
      couponId: "",
    },
  ],
};
