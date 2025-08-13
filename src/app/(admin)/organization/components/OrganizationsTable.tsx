"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Organization } from "@/types/organization.type";

export default function OrganizaitonsTable({
  tableData,
}: {
  tableData: Organization[];
}) {

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="
                    px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ชื่อ ภาษาไทย
                </TableCell>
                <TableCell
                  isHeader
                  className="
                    px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ชื่อ ภาษาอังกฤษ
                </TableCell>
                <TableCell
                  isHeader
                  className="
                    px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  code name
                </TableCell>
                <TableCell
                  isHeader
                  className="
                    px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  จำนวนโครงการ
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((data) => (
                <TableRow
                  key={data.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                //   onClick={() => handleOrganizationClick(data)}
                >
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {data.thai_name}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {data.eng_name}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {data.code_name}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {Array.isArray(data.programs) ? data.programs.length : 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
