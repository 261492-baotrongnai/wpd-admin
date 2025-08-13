"use server";
import { Program } from "./program";
import ProgramCard from "./components/ProgramCard";

import "./components/styles.css";
import { getProgramInfo } from "../../actions/get_program_info";
import PageContainer from "../components/container/PageContainer";

export default async function ProgramsPage() {
  const programs = await getProgramInfo();

  return (
    <PageContainer title="Programs" description="List of all programs">
      <div>

        {programs ? (
          programs.map((program: Program) => (
            <ProgramCard key={program.id} program={program} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </PageContainer>
  );
}
