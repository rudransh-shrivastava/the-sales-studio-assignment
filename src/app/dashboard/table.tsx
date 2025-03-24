import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Coupon } from "./types"; // using the Coupon type from your types file

interface DashboardTableProps {
  data: Coupon[];
}

export function DashboardTable({ data }: DashboardTableProps) {
  // This state could be used later to control the dialog box
  // const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleActionClick = (coupon: Coupon) => {
    // TODO: Replace with dialog open logic
    console.log("Open actions for coupon:", coupon.id);
    // setSelectedCoupon(coupon);
  };

  return (
    <Table>
      <TableCaption>A list of coupons.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Claimed</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Claimed At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((coupon) => (
          <TableRow key={coupon.id}>
            <TableCell className="font-medium">{coupon.id}</TableCell>
            <TableCell>{coupon.name}</TableCell>
            <TableCell>{coupon.code}</TableCell>
            <TableCell>{coupon.isClaimed ? "Yes" : "No"}</TableCell>
            <TableCell>{coupon.isActive ? "Yes" : "No"}</TableCell>
            <TableCell>{coupon.claimedAt}</TableCell>
            <TableCell className="text-right">
              {/* 3-dot dropdown button placeholder */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
