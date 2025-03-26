"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coupon, emptyCoupon } from "./types";
import { CouponDialog } from "./coupon-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { HistoryDialog } from "./history-dialog";
import { ClaimHistory } from "@prisma/client";

export function DashboardTable() {
  const { data } = useQuery<Coupon[]>({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axios.get("/api/coupons");
      return response.data;
    },
  });
  const coupons = data || [];
  const [isCouponDialogOpen, setIsCouponDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon>();
  const queryClient = useQueryClient();

  const couponMutation = useMutation({
    mutationFn: async (coupon: Coupon) => {
      if (coupon.id != "") {
        // Edit existing coupon via PUT
        const response = await axios.put(`/api/coupons`, coupon);
        return response.data;
      } else {
        // Add new coupon via POST
        const response = await axios.post("/api/coupons", coupon);
        return response.data;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch coupons after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  // History
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [historyCouponId, setHistoryCouponId] = useState("");
  const historyMutation = useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      // Invalidate and refetch coupons after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["history"] });
      setIsHistoryDialogOpen(true);
    },
  });
  const { data: historyData } = useQuery<ClaimHistory[]>({
    queryKey: ["history", historyCouponId],
    queryFn: async () => {
      if (historyCouponId == "") {
        return [];
      }
      const response = await axios.get(
        `/api/history?couponId=${historyCouponId}`,
      );
      console.log(response.data);
      return response.data;
    },
  });

  function handleEdit(coupon: Coupon) {
    setEditingCoupon(coupon);
    setIsCouponDialogOpen(true);
  }
  function handleClaimHistory(couponId: string) {
    setHistoryCouponId(couponId);
    historyMutation.mutate();
  }
  return (
    <div className="pl-4 pr-4">
      <Table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <TableCaption className="text-sm text-gray-500">
          A list of coupons.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              ID
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Code
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Active
            </TableHead>
            <TableHead className="px-4 py-2 text-right text-sm font-medium text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon, index) => (
            <TableRow
              key={coupon.id}
              className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
            >
              <TableCell className="px-4 py-2 font-medium text-gray-900">
                {coupon.id}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700">
                {coupon.name}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700">
                {coupon.code}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700">
                {coupon.isActive ? "Yes" : "No"}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center p-2 rounded-full hover:bg-gray-200">
                    {/* 3-dot icon */}
                    <span className="text-xl">&#8942;</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        handleEdit(coupon);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleClaimHistory(coupon.id);
                      }}
                    >
                      Claim History
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end p-4">
        <Button
          onClick={() => {
            setIsCouponDialogOpen(true);
            setEditingCoupon(emptyCoupon);
          }}
        >
          Add
        </Button>
        <CouponDialog
          isDialogVisible={isCouponDialogOpen}
          setIsDialogVisible={setIsCouponDialogOpen}
          editingCoupon={editingCoupon}
          onSubmit={(coupon: Coupon) => {
            couponMutation.mutate(coupon);
          }}
        />
        <HistoryDialog
          data={historyData}
          isDialogVisible={isHistoryDialogOpen}
          setIsDialogVisible={setIsHistoryDialogOpen}
        />
      </div>
    </div>
  );
}
