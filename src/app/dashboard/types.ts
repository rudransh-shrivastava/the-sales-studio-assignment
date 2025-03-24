export type Coupon = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  isClaimed: boolean;
  claimedAt: string;
  createdAt: string;
  updatedAt: string;
  // TODO: Change the claim history to not be an array
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
