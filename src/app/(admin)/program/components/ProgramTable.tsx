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

import { CopyIcon } from "../../../../icons/index";
import { useRef, useState } from "react";

interface ProgramsTableProps {
  tableData: ProgramTable[];
}

export default function ProgramsTable({ tableData }: ProgramsTableProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const popupRef = useRef<HTMLSpanElement | null>(null);

  const handleProgramClick = (program_detail: ProgramTable) => {
    window.location.href = `/program/${encodeURIComponent(
      program_detail.program.code
    )}`;
  };

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200); // Reset after 1.2s
  };

  return (
    <>
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

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((data) => (
                  <TableRow
                    key={data.program.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                  >
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div
                        className="flex items-center gap-3"
                        onClick={() => handleProgramClick(data)}
                      >
                        <span className="block font-medium text-gray-800 text-theme-sm hover:text-brand-500 dark:text-white/90">
                          {data.program.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell
                      className={`px-5 py-4 sm:px-6 text-start inline-flex ${
                        data.program.code ? "text-gray-800" : "text-gray-300"
                      }`}
                    >
                      {data.program.code ? data.program.code : "No code"}
                      {data.program.code && (
                        <span
                          className="px-2 cursor-pointer relative"
                          onClick={() =>
                            handleCopy(data.program.code, data.program.id)
                          }
                          title={
                            copiedId === data.program.id ? "Copied!" : "Copy"
                          }
                          style={{ position: "relative" }}
                        >
                          <CopyIcon
                            className={
                              copiedId === data.program.id
                                ? "text-green-500"
                                : "text-gray-500 hover:text-blue-400" +
                                  " transition-colors duration-200"
                            }
                          />
                          {copiedId === data.program.id && (
                            <span
                              ref={popupRef}
                              className="absolute left-1/2 -translate-x-1/2 -top-7 bg-black text-white text-xs rounded px-2 py-1 shadow z-10"
                            >
                              Copied!
                            </span>
                          )}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start truncate">
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
