"use server";

import ComponentCard from "@/components/common/ComponentCard";
import { Organization } from "@/types/organization.type";
import { ProgramTable } from "@/types/program.type";
import { cookies } from "next/headers";

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
      <div>
        <h2>{detail.program.name}</h2>
        <p>{detail.program.organization?.thai_name}</p>
        <p>Code: {detail.program.code}</p>
      </div>
    </ComponentCard>
  );
}
