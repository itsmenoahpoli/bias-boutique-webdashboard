import { Package } from "lucide-react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import { useState } from "react";

interface Voucher {
  id: number;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  validFrom: string;
  validUntil: string;
  status: "active" | "expired" | "used";
}

export default function Vouchers() {
  const [vouchers] = useState<Voucher[]>([]);

  return (
    <div>
      <PageMeta
        title="Manage Vouchers | Bias Boutique Dashboard"
        description="Voucher management dashboard for Bias Boutique admin panel"
      />
      <PageBreadcrumb pageTitle="Manage Vouchers" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex items-center justify-between mb-6">
          <Button>Add Voucher</Button>
        </div>

        {vouchers.length > 0 ? (
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Code
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Discount
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Valid From
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Valid Until
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {/* Voucher rows will be mapped here */}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-800 mb-4">
              <Package className="text-gray-500 size-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Vouchers Yet
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              When you create vouchers, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
