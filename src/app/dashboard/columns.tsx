// app/dashboard/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { EditCouponDialog } from "./dialog";

export type Coupon = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  isClaimed: boolean;
  claimedAt: string;
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

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Switch
        checked={row.original.isActive}
        onCheckedChange={(checked) =>
          handleStatusChange(row.original.id, checked)
        }
      />
    ),
  },
  {
    accessorKey: "isClaimed",
    header: "Claimed",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.isClaimed ? "Yes" : "No"}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditCouponDialog />
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    ),
  },
];

async function handleStatusChange(id: string, checked: boolean) {
  await fetch(`/api/coupons/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isActive: checked }),
  });
}
