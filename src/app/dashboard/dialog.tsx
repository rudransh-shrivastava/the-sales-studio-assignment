"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coupon } from "./types";
import { useState } from "react";

export function CreateDialog() {
  const emptyCoupon: Coupon = {
    id: "",
    name: "",
    code: "",
    isActive: false,
    isClaimed: false,
    claimedAt: "",
    createdAt: "",
    updatedAt: "",
  };
  const [dialogCoupon, setDialogCoupon] = useState<Coupon>(emptyCoupon);
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
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
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
