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
import { CreateDialog } from "./dialog";

interface DashboardTableProps {
  data: Coupon[];
}

export function DashboardTable({ data }: DashboardTableProps) {
  // This state could be used later to control the dialog box
  // const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

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
            Claimed
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Active
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Claimed At
          </TableHead>
          <TableHead className="px-4 py-2 text-right text-sm font-medium text-gray-700">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((coupon, index) => (
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
              {coupon.isClaimed ? "Yes" : "No"}
            </TableCell>
            <TableCell className="px-4 py-2 text-gray-700">
              {coupon.isActive ? "Yes" : "No"}
            </TableCell>
            <TableCell className="px-4 py-2 text-gray-700">
              {coupon.claimedAt}
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Claim History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        <div className="flex justify-end p-4">
          <CreateDialog />
        </div>
      </TableBody>
    </Table>
  );
}
