import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coupon } from "./columns";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

export function EditCouponDialog<TData>({
  setData,
}: {
  setData: Dispatch<SetStateAction<TData[]>>;
}) {
  const emptyCoupon: Coupon = {
    id: "",
    name: "",
    code: "",
    isActive: false,
    isClaimed: false,
    claimedAt: "",
    createdAt: "",
  };
  const [coupon, setCoupon] = useState<Coupon>(emptyCoupon);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(e) => {
        setDialogOpen(e.valueOf());
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add Coupon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Add a new coupon</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="amount"
              value={coupon.name}
              className="col-span-3"
              onChange={(e) => {
                setCoupon({ ...coupon, name: e.target.value });
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setData((prev) => [...prev, coupon as TData]);
              setDialogOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
