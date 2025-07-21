import "../components/styles.css";
import CreateProgramForm from "../components/CreateForm";

export default function CreateProgramPage() {
  return (
    <div>
      <h1 className="text-xl">สร้างโครงการใหม่</h1>
      <CreateProgramForm />
    </div>
  );
}
