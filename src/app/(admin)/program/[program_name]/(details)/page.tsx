"use server";

import ComponentCard from "@/components/common/ComponentCard";
import { ProgramTable } from "@/types/program.type";
import { cookies } from "next/headers";

const infoBox = (label: string, info: string) => {
  return (
    <div className="inline-flex items-center gap-2 w-full">
      <span className="text-gray-400 w-[30%]">{label}</span>
      <span className="text-gray-600 w-[70%]">{info}</span>
    </div>
  );
};

export default async function ProgramDetailPage() {
  const cookieStore = await cookies();
  const programCookie = cookieStore.get("program_detail")?.value;
  if (!programCookie) return <p>Program not found or not loaded.</p>;
  let detail: ProgramTable;
  try {
    detail = JSON.parse(programCookie);
  } catch {
    return <p>Program data is corrupted.</p>;
  }

  return (
    <ComponentCard title={`รายละเอียดโครงการ`}>
      <div className="space-y-6 flex flex-col">
        {infoBox("Program Name", detail.program.name)}
        {infoBox(
          "Organization",
          detail.program.organization?.thai_name || "N/A"
        )}
        {infoBox("Code", detail.program.code)}
      </div>
    </ComponentCard>
  );
}
