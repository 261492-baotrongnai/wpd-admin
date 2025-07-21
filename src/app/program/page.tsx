"use server";
import { Program } from "./program";
import ProgramCard from "./components/ProgramCard";

import "./components/styles.css";
import Link from "next/link";
import { getProgramInfo } from "../actions/get_program_info";

export default async function ProgramsPage() {
  const programs = await getProgramInfo();
  return (
    <div>
      <div className="header">
        <h1 className="text-[24px]">Programs Page</h1>
        <Link href="/program/create">
          <button className="create-program-button">สร้างโครงการใหม่</button>
        </Link>
      </div>

      {programs ? (
        programs.map((program: Program) => (
          <ProgramCard key={program.id} program={program} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
