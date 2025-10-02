"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserWithProfile } from "@/types/user.types";
import Image from "next/image";

interface UsersTableProps {
  tableData: UserWithProfile[];
}

function lastRecord(lastRecordedAt: string): string {
  if (lastRecordedAt === null || lastRecordedAt === undefined) {
    return "No records";
  }
  const date = new Date(lastRecordedAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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
  const handleUserClick = (user: UserWithProfile) => {
    // You cannot use server-side cookies in a client component.
    // Use document.cookie or a client-side library instead.
    document.cookie = `user_detail=${encodeURIComponent(
      JSON.stringify(user)
    )}; path=/`;
    // Redirect to user detail page without 'users' ex: /program/[code]/[id]

    window.location.href = `/user/${user.id}`;
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
                    {""}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
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
                {tableData.length === 0 ? (
                  // skeleton loading state
                  <TableRow>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="mx-auto h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="h-4 w-32 rounded bg-gray-200 animate-pulse mx-auto" />
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="h-4 w-24 rounded bg-gray-200 animate-pulse mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData.map((data) => (
                    <TableRow
                      key={data.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                      onClick={() => handleUserClick(data)}
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {data.profile !== null ? (
                          <Image
                            src={data.profile.pictureUrl}
                            alt={data.profile.displayName}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200" />
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {data.profile?.displayName || "No Name"}
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
