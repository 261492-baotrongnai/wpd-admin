"use client";

import { getProgramUsers } from "@/actions/get_program_users";
import ComponentCard from "@/components/common/ComponentCard";
import UsersTable from "../../components/UsersTable";
import { UserWithProfile } from "@/types/user.types";
import { useEffect, useState } from "react";


export default function ProgramUserPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const fetchCode = async () => {
      const p = await params;
      setCode(p.code);
    };
    fetchCode();
  }, [params]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const users = await getProgramUsers(code);
        console.log("Fetched users:", users);
        setUsers(users);
      };
      fetchUsers();
    } catch (e) {
      setError("Failed to load users. Error: " + e);
      console.error("Error fetching users:", e);
    }
  }, [code]);

  return (
    <>
      <ComponentCard title={`ผู้เข้าร่วมโครงการ`}>
        {error ? <p>{error}</p> : <UsersTable tableData={users} />}
      </ComponentCard>
    </>
  );
}
