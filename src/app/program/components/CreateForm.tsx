"use client";
import { useState, useTransition } from "react";
import { handleSubmit } from "../../actions/create_program";

export default function CreateProgramForm() {
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(false);

  async function onSubmit(formData: FormData) {
    setDisabled(true);
    startTransition(() => {
      handleSubmit(formData);
    });
  }

  return (
    <form action={onSubmit}>
      <div>
        <label htmlFor="name">ชื่อโครงการ:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="hospitalName">ชื่อโรงพยาบาล:</label>
        <input type="text" id="hospitalName" name="hospitalName" required />
      </div>
      <div>
        <label htmlFor="code">Code:</label>
        <input type="text" id="code" name="code" required />
      </div>
      <button type="submit" disabled={disabled || isPending}>
        {isPending ? "กำลังสร้าง..." : "สร้างโครงการ"}
      </button>
    </form>
  );
}
