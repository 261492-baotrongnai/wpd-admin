"use server";

import { getProgramUsers } from "@/actions/get_program_users";
import ComponentCard from "@/components/common/ComponentCard";
import { cookies } from "next/headers";
import UsersTable from "../../components/UsersTable";

export default async function ProgramUserPage() {
  const cookieStore = await cookies();
  const programCookie = cookieStore.get("program_detail")?.value;
  if (!programCookie) return <p>Program not found or not loaded.</p>;

  let programDetail;
  try {
    programDetail = JSON.parse(programCookie);
  } catch {
    return <p>Invalid program cookie format.</p>;
  }

  const users = await getProgramUsers(programDetail?.program.id);
  console.log("Fetched users:", users);
  return (
    <>
      <ComponentCard title={`ผู้เข้าร่วมโครงการ`}>
        <UsersTable tableData={users} />
      </ComponentCard>
    </>
  );
}
