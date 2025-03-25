import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CouponClaim from "./coupon-claim";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-lg shadow-lg m-16">
        <CardHeader>
          <CardTitle>Claim Your Coupon</CardTitle>
          <CardDescription>
            Enter your coupon code below and click Claim
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CouponClaim />
        </CardContent>
      </Card>
    </div>
  );
}
