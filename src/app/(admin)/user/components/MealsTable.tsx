import { getSignedUrl } from "@/actions/get_signed_url";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meal } from "@/types/meal.types";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function MealsTable({
  userId,
  date,
  meals,
}: {
  userId: string;
  date: Dayjs | null;
  meals: Meal[] | null | undefined;
}) {
  // Prefetch signed URLs for all meals
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [loadingUrls, setLoadingUrls] = useState(false);

  useEffect(() => {
    if (!meals || meals.length === 0 || !userId) {
      setSignedUrls({});
      return;
    }

    let cancelled = false;
    setLoadingUrls(true);

    (async () => {
      try {
        const list = await Promise.all(
          meals.map(async (m) => {
            try {
              const url = await getSignedUrl(
                `meal_images/${userId}/${m.imageName}`
              );
              return { id: m.id, url };
            } catch {
              return { id: m.id, url: "" };
            }
          })
        );

        if (cancelled) return;

        const map: Record<string, string> = {};
        for (const { id, url } of list) {
          if (url) map[id] = url;
        }
        setSignedUrls(map);
      } finally {
        if (!cancelled) setLoadingUrls(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [meals, userId]);

  const thaiFormattedSelectedDate = useMemo(() => {
    if (!date) return null;

    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const day = date.date();
    const month = thaiMonths[date.month()];
    const year = date.year() + 543; // Convert to Buddhist Era

    return `${day} ${month} ${year}`;
  }, [date]);

  function concateFoodNames(meal: Meal) {
    const foodNames = meal.foods?.map((food) => food.name).join(", ");
    return foodNames;
  }

  function thaiMealType(meal: Meal) {
    switch (meal.mealType) {
      case "breakfast":
        return "มื้อเช้า";
      case "lunch":
        return "มื้อกลางวัน";
      case "dinner":
        return "มื้อเย็น";
      case "snack":
        return "ของว่าง";
      default:
        return meal.mealType;
    }
  }

  return (
    <div className="overflow-hidden w-full rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {date ? thaiFormattedSelectedDate : "No Date Selected"}
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                รูป
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ชื่อเมนู
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                มื้อ
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                เกรด
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {meals?.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[100px] w-[100px] overflow-hidden rounded-md">
                      {signedUrls[meal.id] ? (
                        <Image
                          width={100}
                          height={100}
                          src={signedUrls[meal.id]}
                          className="h-[100px] w-[100px] object-cover"
                          alt={meal.imageName || ""}
                        />
                      ) : (
                        <div className="h-[100px] w-[100px] bg-gray-100 animate-pulse" />
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {concateFoodNames(meal)}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {thaiMealType(meal)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {meal.avgGrade}
                </TableCell>
              </TableRow>
            ))}
            {!meals?.length && (
              <TableRow>
                <TableCell className="py-6 text-center text-gray-400">
                  {loadingUrls ? "กำลังโหลด..." : "ไม่มีรายการอาหาร"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
