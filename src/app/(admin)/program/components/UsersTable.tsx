"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user.types";

interface UsersTableProps {
  tableData: User[];
}

function lastRecord(lastRecordedAt: string): string {
  const date = new Date(lastRecordedAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (isNaN(diffInSeconds)) {
    return "ยังไม่มีการบันทึก";
  }
  if (diffInSeconds < 60) {
    // 60 seconds
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    // 60 minutes
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    // 24 hours
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 604800) {
    // 7 days
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  } else if (diffInSeconds < 2419200) {
    // 30 days
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  } else {
    return new Date(lastRecordedAt).toLocaleDateString();
  }
}

export default function UsersTable({ tableData }: UsersTableProps) {
  const handleUserClick = (user: User) => {
    // You cannot use server-side cookies in a client component.
    // Use document.cookie or a client-side library instead.
    document.cookie = `user_detail=${encodeURIComponent(
      JSON.stringify(user)
    )}; path=/`;
    // window.location.href = `/user/${encodeURIComponent(
    //   user.id
    // )}`;
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
                    ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    internalId
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Last Recorded
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((data) => (
                  <TableRow
                    key={data.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                    onClick={() => handleUserClick(data)}
                  >
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {data.id}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {data.internalId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {lastRecord(data.last_recorded_at)}
                        {/* {data.last_recorded_at ? ` (${new Date(data.last_recorded_at).toLocaleDateString()})` : ""} */}
                      </span>
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
