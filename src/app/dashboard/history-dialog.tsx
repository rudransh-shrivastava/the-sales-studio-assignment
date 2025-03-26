import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClaimHistory } from "@prisma/client";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
export function HistoryDialog({
  data,
  isDialogVisible,
  setIsDialogVisible,
}: {
  data: ClaimHistory[] | undefined;
  isDialogVisible: boolean;
  setIsDialogVisible: (isVisible: boolean) => void;
}) {
  return (
    <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim History</DialogTitle>
          <DialogDescription>
            Claim History of coupons claimed by IPs and their respective browser
            sessions
          </DialogDescription>
        </DialogHeader>
        <Table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                IP
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Browser Session
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((data, index) => (
              <TableRow
                key={data.id}
                className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <TableCell className="px-4 py-2 font-medium text-gray-900">
                  {data.id}
                </TableCell>
                <TableCell className="px-4 py-2 font-medium text-gray-900">
                  {data.ipAddress}
                </TableCell>
                <TableCell className="px-4 py-2 font-medium text-gray-900">
                  {data.browserSessionId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
