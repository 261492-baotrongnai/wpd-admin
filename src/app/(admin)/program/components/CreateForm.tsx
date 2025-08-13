"use client";
import { useEffect, useState, useTransition } from "react";
import { handleSubmit } from "@/actions/create_program";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { getOrganizations } from "@/actions/get_organizations";
// import { Organization } from "@/types/organization.type";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function CreateProgramForm() {
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(false);
  const [name_error, setNameError] = useState(false);
  const [org_error, setOrgError] = useState(false);
  // const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState(0);
  const [organizationOptions, setOrganizationOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  //   console.log("Name:", e.target.value);
  //   if (e.target.value) {
  //     setNameError(false);
  //   }
  // };

  // const handleSelectChange = (value: string) => {
  //   setOrganizationId(Number(value));
  //   console.log("Organization ID:", organizationId);
  //   setOrgError(false); // Reset error when a valid selection is made
  // };

  async function fetchOrganizations() {
    const response = await getOrganizations();
    console.log("Fetched Organizations:", response);
    if (!response) {
      console.error("Failed to fetch organizations");
      return;
    }

    // Map organizations to the format required by the Select component
    const options = response.map((org) => ({
      value: org.id.toString(),
      label: org.thai_name || org.eng_name, // Use Thai name or English name as label
    }));
    console.log("Mapped Organization Options:", options);
    await setOrganizationOptions(options);
    // console.log("Organization Options State:", organizationOptions);
  }

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    console.log("Organization Options State:", organizationOptions);
  }, [organizationOptions]);

  useEffect(() => {
    console.log("Organization ID updated:", organizationId);
  }, [organizationId]);

  // async function onSubmit() {
  //   if (!name) setNameError(true);
  //   console.log("Submitting with Name:", name);
  //   if (organizationId === 0) setOrgError(true);
  //   console.log("Submitting with Organization ID:", organizationId);
  //   if (!name || !organizationId) return;

  //   setDisabled(true);
  //   startTransition(() => {
  //     handleSubmit({ name, organizationId });
  //   });
  // }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const organizationId = Number(formData.get("organization_id"));
    console.log("Form Data:", { name, organizationId });

    let hasError = false;
    if (!name || name.trim() === "") {
      setNameError(true);
      hasError = true;
    }
    if (!organizationId || organizationId === 0) {
      setOrgError(true);
      hasError = true;
    }
    if (hasError) return;

    console.log("no errors, proceeding with submission");
    setDisabled(true);
    startTransition(() => {
      handleSubmit({ name, organizationId });
    });
  }

  return (
    <>
      <PageBreadcrumb pageTitle="สร้างโครงการใหม่" />
      <ComponentCard title="กรอกข้อมูลโครงการใหม่">
        <form onSubmit={onSubmit}>
          <div className="space-y-18 pl-[60px] pr-[60px]">
            <div className="flex items-center gap-4">
              <div className="dark:text-gray-400 text-gray-600">
                ชื่อโครงการ : <span className="text-error-500">*</span>
              </div>
              <div className="relative flex-1 w-full">
                {" "}
                <Input
                  name="name"
                  type="text"
                  placeholder="ชื่อโครงการ"
                  className="min-w-[380px]"
                  error={name_error}
                  onChange={() => setNameError(false)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="dark:text-gray-400 text-gray-600">
                Organization : <span className="text-error-500">*</span>
              </div>
              <div className="relative flex-1">
                <Select
                  options={organizationOptions}
                  placeholder="Select an organization"
                  onChange={(value) => {
                    setOrganizationId(Number(value));
                    setOrgError(false);
                  }}
                  error={org_error}
                />
                {/* Hidden input to include organizationId in FormData */}
                <input
                  type="hidden"
                  name="organization_id"
                  value={organizationId || ""}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
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
                {isPending ? "กำลังสร้าง..." : "สร้างโครงการ"}
              </Button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
