"use client";
import Badge from "@/components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProgramTable } from "@/types/program.type";

interface ProgramsTableProps {
  tableData: ProgramTable[];
}

export default function ProgramsTable({ tableData }: ProgramsTableProps) {
  const handleProgramClick = (program_detail: ProgramTable) => {
    // You cannot use server-side cookies in a client component.
    // Use document.cookie or a client-side library instead.
    document.cookie = `program_detail=${encodeURIComponent(
      JSON.stringify(program_detail)
    )}; path=/; Secure; SameSite=Lax; `;
    console.log("Program detail:", document.cookie);
    window.location.href = `/program/${encodeURIComponent(
      program_detail.program.name
    )}`;
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
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

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((data) => (
                  <TableRow
                    key={data.program.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                    onClick={() => handleProgramClick(data)}
                  >
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {data.program.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`px-5 py-4 sm:px-6 text-start ${
                        data.program.code ? "text-gray-800" : "text-gray-300"
                      }`}
                    >
                      {data.program.code ? data.program.code : "No code"}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {data.program.organization?.thai_name ||
                        data.program.organization?.eng_name ||
                        "No organization"}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {data.totalUser > 0 ? (
                        <Badge variant="light">{data.totalUser} users</Badge>
                      ) : (
                        "No users"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
