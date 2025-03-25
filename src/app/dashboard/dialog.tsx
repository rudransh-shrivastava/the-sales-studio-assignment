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
import { Coupon, emptyCoupon } from "./types";
import { useState, useEffect } from "react";

export function CustomDialog({
  data,
  setData,
  isDialogVisible,
  setIsDialogVisible,
  editingCoupon,
}: {
  data: Coupon[];
  setData: (data: Coupon[]) => void;
  isDialogVisible: boolean;
  setIsDialogVisible: (isVisible: boolean) => void;
  editingCoupon?: Coupon;
}) {
  const [dialogCoupon, setDialogCoupon] = useState<Coupon>(emptyCoupon);

  useEffect(() => {
    // If editing an existing coupon, we prefill the form
    if (editingCoupon) {
      setDialogCoupon(editingCoupon);
    }
  }, [editingCoupon, isDialogVisible]);

  // TODO: send the data using api
  const handleSave = () => {
    if (editingCoupon && editingCoupon.id !== "") {
      // Edit existing coupon
      console.log(dialogCoupon);
      setData(
        data.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...dialogCoupon,
                updatedAt: new Date().toISOString(),
              }
            : coupon,
        ),
      );
      setDialogCoupon(emptyCoupon);
    } else {
      // Add new coupon
      const newCoupon = {
        ...dialogCoupon,
        id: `coupon-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setData([...data, newCoupon]);
    }

    setIsDialogVisible(false);
  };

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
              handleSave();
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
