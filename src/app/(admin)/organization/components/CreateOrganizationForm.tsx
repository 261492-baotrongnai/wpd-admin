"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState, useTransition } from "react";
import { handleSubmit } from "@/actions/create_organization";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";

export default function CreateOrganizationForm() {
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(false);
  const [thaiNameError, setThaiNameError] = useState(false);
  const [engNameError, setEngNameError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const thai_name = formData.get("thai_name") as string;
    const eng_name = formData.get("eng_name") as string;
    console.log("Form Data:", { thai_name, eng_name });

    let hasError = false;
    if (!thai_name || thai_name.trim() === "") {
      setThaiNameError(true);
      hasError = true;
    }
    if (!eng_name || eng_name.trim() === "") {
      setEngNameError(true);
      hasError = true;
    }
    if (hasError) return;

    setDisabled(true);
    startTransition(() => {
      handleSubmit({ thai_name, eng_name });
    });
  }

  return (
    <>
      {" "}
      <form onSubmit={onSubmit}>
        <div className="space-y-18 pl-[60px] pr-[60px]">
          <div className="flex items-center gap-4">
            <div className="dark:text-gray-400 text-gray-600">
              ชื่อภาษาไทย : <span className="text-error-500">*</span>
            </div>
            <div className="relative flex-1 w-full">
              {" "}
              <Input
                name="thai_name"
                type="text"
                placeholder="ชื่อ organization ภาษาไทย "
                className="min-w-[380px]"
                error={thaiNameError}
                onChange={() => setThaiNameError(false)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="dark:text-gray-400 text-gray-600">
              ชื่อภาษาอังกฤษ : <span className="text-error-500">*</span>
            </div>
            <div className="relative flex-1 w-full">
              {" "}
              <Input
                name="eng_name"
                type="text"
                placeholder="ชื่อ organization ภาษาอังกฤษ "
                className="min-w-[380px]"
                error={engNameError}
                onChange={() => setEngNameError(false)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              endIcon={<AddBoxIcon />}
              variant={isPending ? "outline" : "primary"}
              size="md"
              // type="submit"
              disabled={disabled || isPending}
              // style={{ width: "180px", height: "40px" }}
            >
              {isPending ? "กำลังสร้าง..." : "สร้าง organization"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
