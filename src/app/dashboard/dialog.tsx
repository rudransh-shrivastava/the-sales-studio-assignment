"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coupon } from "./types";
import { useState } from "react";

export function CustomDialog({
  data,
  setData,
  isDialogVisible,
  setIsDialogVisible,
}: {
  data: Coupon[];
  setData: (data: Coupon[]) => void;
  isDialogVisible: boolean;
  setIsDialogVisible: (isVisible: boolean) => void;
}) {
  const emptyCoupon: Coupon = {
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
  const [dialogCoupon, setDialogCoupon] = useState<Coupon>(emptyCoupon);
  return (
    <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Coupon</DialogTitle>
          <DialogDescription>Add a new Coupon and click Add</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={dialogCoupon.name}
              className="col-span-3"
              onChange={(e) => {
                setDialogCoupon({ ...dialogCoupon, name: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              value={dialogCoupon.code}
              className="col-span-3"
              onChange={(e) => {
                setDialogCoupon({ ...dialogCoupon, code: e.target.value });
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              const newCoupon = {
                ...dialogCoupon,
                id: `coupon-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              setData([...data, dialogCoupon]);
              // TODO: send the data using api
              console.log("send new coupon to backend: ", newCoupon);
              // init with empty coupon
              setDialogCoupon(emptyCoupon);
              // close
              setIsDialogVisible(false);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
