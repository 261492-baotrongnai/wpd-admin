"use client";
import { Program } from "../program";
import "./styles.css";
export default function ProgramCard({ program }: { program: Program }) {
  const handleProgramClick = (program: Program) => {
    // You cannot use server-side cookies in a client component.
    // Use document.cookie or a client-side library instead.
    document.cookie = `program_detail=${encodeURIComponent(JSON.stringify(program))}; path=/`;
    window.location.href = `/program/${encodeURIComponent(program.name)}`;
  };

  return (
    <div onClick={() => handleProgramClick(program)} className="program-card">
      <h2>{program.name}</h2>
      <p>{program.hospitalName}</p>
      <p>Code: {program.code}</p>
    </div>
  );
}
