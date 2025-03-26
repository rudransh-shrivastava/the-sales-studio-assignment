"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// TODO: Add a Active (true, false) field
export function CouponDialog({
  isDialogVisible,
  setIsDialogVisible,
  editingCoupon,
  onSubmit,
}: {
  isDialogVisible: boolean;
  setIsDialogVisible: (isVisible: boolean) => void;
  editingCoupon?: Coupon;
  onSubmit: (coupon: Coupon) => void;
}) {
  const [dialogCoupon, setDialogCoupon] = useState<Coupon>(emptyCoupon);

  useEffect(() => {
    // If editing an existing coupon, we prefill the form
    if (editingCoupon) {
      setDialogCoupon(editingCoupon);
    }
  }, [editingCoupon, isDialogVisible]);

  const handleSave = () => {
    // Build the coupon object with proper timestamps.
    const couponToSubmit =
      editingCoupon && editingCoupon.id !== ""
        ? { ...dialogCoupon, updatedAt: new Date().toISOString() }
        : {
            ...dialogCoupon,
            id: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

    onSubmit(couponToSubmit);
    setDialogCoupon(emptyCoupon);
    setIsDialogVisible(false);
  };

  return (
    <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
      <DialogContent>
        <DialogHeader>
          {" "}
          <DialogTitle>
            {editingCoupon && editingCoupon.id !== ""
              ? "Edit Coupon"
              : "Add Coupon"}
          </DialogTitle>{" "}
          <DialogDescription>
            {editingCoupon && editingCoupon.id !== ""
              ? "Edit the coupon details and click Save"
              : "Add a new Coupon and click Add"}
          </DialogDescription>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Select
              value={dialogCoupon.isActive ? "Yes" : "No"}
              onValueChange={(value) => {
                setDialogCoupon({
                  ...dialogCoupon,
                  isActive: value === "Yes",
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              handleSave();
            }}
          >
            + {editingCoupon && editingCoupon.id !== "" ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
