"use client";
import "../components/styles.css";
import { createProgram } from "../program.service";

export default function CreateProgramPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const program = {
      name: formData.get("programName") as string,
      hospitalName: formData.get("hospitalName") as string,
      code: formData.get("code") as string,
    };

    // Call the createProgram function from the service
    createProgram(program)
      .then((response) => {
        console.log("Program created successfully:", response.data);
        // Redirect or show success message
      })
      .catch((error) => {
        console.error("Error creating program:", error);
      });
  };
  return (
    <div>
      <h1 className="text-xl ">สร้างโครงการใหม่</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="programName">ชื่อโครงการ:</label>
          <input type="text" id="programName" name="programName" required />
        </div>
        <div>
          <label htmlFor="hospitalName">ชื่อโรงพยาบาล:</label>
          <input type="text" id="hospitalName" name="hospitalName" required />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" name="code" required />
        </div>
        <button type="submit">สร้างโครงการ</button>
      </form>
    </div>
  );
}
