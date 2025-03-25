"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CouponClaim() {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["claim"],
    queryFn: async () => {
      return "Claim";
    },
  });
  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await axios.post("/api/claim", { couponCode: code });
      return response.data;
    },
    onSuccess: () => {
      setMessage("Coupon claimed successfully!");
    },
    // eslint-disable-next-line
    onError: (error: any) => {
      setMessage(error.response?.data?.error || "An error occurred");
    },
  });

  const handleClaim = () => {
    setMessage("");
    mutation.mutate(couponCode);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        placeholder="Enter coupon code"
      />
      <Button
        onClick={handleClaim}
        className="text-white px-4 py-2 rounded-md w-full"
        disabled={isLoading}
      >
        {isLoading ? "Claiming..." : "Claim"}
      </Button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
}
