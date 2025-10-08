"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrganizationsTableSkeletonProps {
  rows?: number;
}

export default function OrganizationsTableSkeleton({
  rows = 5,
}: OrganizationsTableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ชื่อ ภาษาไทย
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ชื่อ ภาษาอังกฤษ
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  code name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  จำนวนโครงการ
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body - Skeleton Rows */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.from({ length: rows }).map((_, index) => (
                <TableRow key={index}>
                  {/* Thai Name Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="h-5 w-40 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                  </TableCell>

                  {/* English Name Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="h-5 w-48 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                  </TableCell>

                  {/* Code Name Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="h-5 w-24 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                  </TableCell>

                  {/* Program Count Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="h-5 w-12 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
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
