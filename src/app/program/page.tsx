"use client";
import { useEffect, useState } from "react";

import { getPrograms, Program } from "./program.service";
import ProgramCard from "./components/ProgramCard";

import "./components/styles.css";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  useEffect(() => {
    getPrograms()
      .then((res) => {
        setPrograms(res.data);
      })
      .catch((error) => {
        console.error("Error fetching programs:", error);
      });
  }, []);
  return (
    <div>
      <div className="header">
        <h1 className="text-[24px]">Programs Page</h1>
        <button
          className="create-program-button"
          onClick={() => (window.location.href = "/program/create")}
        >
          สร้างโครงการใหม่
        </button>
      </div>

      {programs ? (
        programs.map((program: Program) => (
          <ProgramCard key={program.code} program={program} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
