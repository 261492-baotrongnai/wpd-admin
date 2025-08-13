"use server";

import { cookies } from "next/headers";
import { Program } from "../../program";



export default async function ProgramDetailPage() {
  const cookieStore = await cookies();
  const programCookie = cookieStore.get("program_detail")?.value;
  if (!programCookie) return <p>Program not found or not loaded.</p>;
  let program: Program;
  try {
    program = JSON.parse(programCookie);
  } catch {
    return <p>Program data is corrupted.</p>;
  }

  return (
    <div>
      <h2>{program.name}</h2>
      <p>{program.hospitalName}</p>
      <p>Code: {program.code}</p>
    </div>
  );
}
