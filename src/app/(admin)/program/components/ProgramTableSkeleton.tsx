"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProgramsTableSkeletonProps {
  rows?: number;
}

export default function ProgramsTableSkeleton({
  rows = 5,
}: ProgramsTableSkeletonProps) {
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
                  Program
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Code
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Organization
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total users
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body - Skeleton Rows */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.from({ length: rows }).map((_, index) => (
                <TableRow key={index}>
                  {/* Program Name Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-48 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                    </div>
                  </TableCell>

                  {/* Code Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-24 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                      <div className="h-4 w-4 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                    </div>
                  </TableCell>

                  {/* Organization Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="h-5 w-36 bg-gray-200 dark:bg-white/[0.1] rounded animate-pulse" />
                  </TableCell>

                  {/* Total Users Column */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-white/[0.1] rounded-full animate-pulse" />
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
