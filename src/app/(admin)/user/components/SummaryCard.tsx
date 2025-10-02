import type { SummaryCard } from "../[id]/page";

export default function SummaryCard({
  summary,
  type,
}: {
  summary: SummaryCard | null;
  type: "daily" | "weekly" | "monthly";
}) {
  return (
    <div className="flex flex-col px-auto rounded-2xl border border-gray-200 bg-white pt-5 lg:px-6 dark:border-gray-800 dark:bg-white/[0.03] ">
      {renderHeaderByType(type)}
      <p className="mt-2 mx-auto">{summary?.avgGrade}</p>
      {renderCountByGrade({
        gradeA: summary?.mealCount.gradeA || 0,
        gradeB: summary?.mealCount.gradeB || 0,
        gradeC: summary?.mealCount.gradeC || 0,
      })}
    </div>
  );
}

function renderHeaderByType(type: "daily" | "weekly" | "monthly") {
  switch (type) {
    case "daily":
      return <h5 className="ml-5 text-lg font-medium">เกรดเฉลี่ยวันนี้</h5>;
    case "weekly":
      return (
        <h5 className="ml-5 text-lg font-medium">เกรดเฉลี่ยประจำสัปดาห์</h5>
      );
    case "monthly":
      return <h5 className="ml-5 text-lg font-medium">เกรดเฉลี่ยประจำเดือน</h5>;
  }
}

function renderCountByGrade({
  gradeA,
  gradeB,
  gradeC,
}: {
  gradeA: number;
  gradeB: number;
  gradeC: number;
}) {
  return (
    <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
      <div>
        <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          เกรด A
        </p>
        <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          {gradeA}
        </p>
      </div>

      <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

      <div>
        <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          เกรด B
        </p>
        <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          {gradeB}
        </p>
      </div>

      <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

      <div>
        <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          เกรด C
        </p>
        <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          {gradeC}
        </p>
      </div>
    </div>
  );
}
