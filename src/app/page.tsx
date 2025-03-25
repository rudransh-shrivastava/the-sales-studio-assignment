import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <Card className="w-full max-w-md rounded-lg shadow-lg m-16">
        <CardHeader>
          <CardTitle>Claim Your Coupon</CardTitle>
          <CardDescription>
            Enter your coupon code below and click Claim
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <Label htmlFor="coupon" className="mb-2 text-lg font-medium">
              Enter coupon code
            </Label>
            <Input
              type="text"
              id="coupon"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              placeholder="Coupon Code"
            />
            <Button className="px-4 py-2 rounded-md">Claim</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
