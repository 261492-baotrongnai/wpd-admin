"use client";

import { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageContainer from "@/components/container/PageContainer";
import PendingTable from "../components/PendingTable";
import { Food } from "@/types/food.types";
import { isEditor } from "@/actions/check_editor";
import { getWaitingConfirmation } from "@/actions/get-waiting-confirmation";

export default function PendingFoodMenuPage() {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [items, setItems] = useState<Food[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const editor = await isEditor();
        if (!active) return;
        setHasPermission(editor);
        if (!editor) {
          setLoading(false);
          return;
        }
        const data = await getWaitingConfirmation();
        if (!active) return;

        // Sort by recent update/create
        data.sort((a: Food, b: Food) => {
          const dateA = new Date(a.updatedAt ?? a.createdAt ?? 0);
          const dateB = new Date(b.updatedAt ?? b.createdAt ?? 0);
          return dateB.getTime() - dateA.getTime();
        });

        // Priority: waiting(0), confirmed(1), rejected(2)
        data.sort((a: Food, b: Food) => {
          const pr = (f: Food) => {
            if (f.is_confirmed === false && f.is_rejected === false) return 0;
            if (f.is_confirmed === true) return 1;
            if (f.is_rejected === true) return 2;
            return 3;
          };
          return pr(a) - pr(b);
        });

        setItems(data);
      } catch (e) {
        console.error("Failed loading pending food items", e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <PageContainer
        title="เมนูอาหารรอการยืนยัน | WanPorDee Admin"
        description="Loading pending food items"
      >
        <PageBreadcrumb pageTitle="เมนูอาหารรอการยืนยัน" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="h-11 w-full md:w-[440px] rounded-lg bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="flex gap-2 ml-auto">
              <div className="h-7 w-24 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
              <div className="h-7 w-40 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="px-5 py-3 border-b border-gray-100 dark:border-white/[0.05] font-medium text-gray-500 text-sm dark:text-gray-400">
              กำลังโหลดข้อมูล...
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse grid grid-cols-3 gap-4 px-5 py-3"
                >
                  <div className="h-4 rounded bg-gray-200 dark:bg-white/10 w-40" />
                  <div className="h-4 rounded bg-gray-200 dark:bg-white/10 w-20" />
                  <div className="h-4 rounded bg-gray-200 dark:bg-white/10 w-28" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 h-6 w-48 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
        </div>
      </PageContainer>
    );
  }

  if (hasPermission === false) {
    return (
      <PageContainer title="Access Denied" description="No permission">
        <PageBreadcrumb pageTitle="เมนูอาหารรอการยืนยัน" />
        <div>You do not have permission to view this page.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="เมนูอาหารรอการยืนยัน | WanPorDee Admin"
      description="Manage pending food items"
    >
      <PageBreadcrumb pageTitle="เมนูอาหารรอการยืนยัน" />
      <PendingTable foodItems={items} />
    </PageContainer>
  );
}
