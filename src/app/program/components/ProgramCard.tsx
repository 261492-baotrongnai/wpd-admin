import { Program } from "../program";
import "./styles.css";
export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="program-card">
      <h2>{program.name}</h2>
      <p>{program.hospitalName}</p>
      <p>Code: {program.code}</p>
    </div>
  );
}
