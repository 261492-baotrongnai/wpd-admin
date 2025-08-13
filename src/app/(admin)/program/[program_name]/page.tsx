"use server";
import { redirect } from "next/navigation";

export default async function ProgramNamePage({
  params,
}: {
  params: { program_name: string };
}) {
  redirect(`/program/${params.program_name}/details`);
}
