"use client";

import { User } from "@/types/user.types";
import Image from "next/image";
import { useEffect } from "react";

export default function UserProfileCard({
  user,
  pictureUrl,
  displayName,
}: {
  user?: User | null;
  pictureUrl?: string;
  displayName?: string;
}) {
  useEffect(() => {
    console.log("UserProfileCard user data:", user);
  }, [user]);
  return (
    <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            {pictureUrl ? (
              <Image width={80} height={80} src={pictureUrl} alt="user" />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
            )}
          </div>
          <div className="order-3 xl:order-2">
            <h4 className=" text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {displayName ? displayName : "Loading..."}
            </h4>
          </div>
          {/* Additional user information can be displayed here at the end */}
          <div className="order-4 xl:order-3">
            <p className="text-sm text-center text-gray-600 dark:text-white/90 xl:text-left">
              บันทึกติดต่อกัน: {user?.streaks} วัน
            </p>
          </div>
          <div className="order-5 xl:order-4">
            <p className="text-sm text-center text-gray-600 dark:text-white/90 xl:text-left">
              จำนวนวันที่บันทึก: {user?.totalDays} วัน
            </p>
          </div>
          <div className="order-6 xl:order-5">
            <p className="text-sm text-center text-gray-600 dark:text-white/90 xl:text-left">
              คะแนนสะสม: {user?.points} คะแนน
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
