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
import { Coupon } from "./types";
import { CustomDialog } from "./dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DashboardTableProps {
  data: Coupon[];
}

export function DashboardTable({ data }: DashboardTableProps) {
  const [coupons, setCoupons] = useState<Coupon[]>(data);
  // const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  return (
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
                      console.log("Edit Clicked");
                      // set the selected coupon
                      // but how do we get the selected coupon to set?
                      // set the dialog visible true
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Claim History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        <div className="flex justify-end p-4">
          <Button
            onClick={() => {
              setIsDialogVisible(true);
            }}
          >
            {" "}
            Add{" "}
          </Button>
          <CustomDialog
            data={coupons}
            setData={setCoupons}
            isDialogVisible={isDialogVisible}
            setIsDialogVisible={setIsDialogVisible}
          />
        </div>
      </TableBody>
    </Table>
  );
}
