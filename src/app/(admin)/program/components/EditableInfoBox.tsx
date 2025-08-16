"use client";
import { getOrganizations } from "@/actions/get_organizations";
import {
  updateProgramName,
  updateProgramOrganizatio,
} from "@/actions/update_program";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import { useEffect, useState } from "react";

const EditableInfoBox = ({
  programId,
  label,
  info,
  type = "text",
  editable = false,
  onSave,
}: {
  programId: number;
  label: string;
  info: string;
  type?: "text" | "number" | "select";
  editable?: boolean;
  onSave?: (newValue: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(info);

  const [org_error, setOrgError] = useState(false);
  const [organizationOptions, setOrganizationOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave(value);
  };

  async function handleOrganizationSave() {
    setIsEditing(false);
    await updateProgramOrganizatio(programId, Number(value));
    setValue(
      organizationOptions.find((opt) => opt.value === value)?.label || ""
    );
  }

  async function handleNameSave() {
    setIsEditing(false);
    await updateProgramName(programId, value);
  }

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

  return (
    <div className="inline-flex items-center gap-2 w-full">
      <span className="text-gray-400 w-[30%]">{label}</span>
      <span className="text-gray-600 w-[70%] ">
        {editable ? (
          isEditing ? (
            type === "select" ? (
              <div className="relative flex-1 inline-flex items-center w-full">
                <Select
                  options={organizationOptions}
                  placeholder="Select an organization"
                  onChange={(value) => {
                    setValue(value);
                    setOrgError(false);
                  }}
                  error={org_error}
                  size="sm"
                />
                {/* Hidden input to include organizationId in FormData */}
                <input
                  type="hidden"
                  name="organization_id"
                  value={value || ""}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-13 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
                <button
                  onClick={handleOrganizationSave}
                  className="ml-2 text-blue-500"
                >
                  Save
                </button>
              </div>
            ) : type === "number" ? (
              <>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <button onClick={handleSave} className="ml-2 text-blue-500">
                  Save
                </button>
              </>
            ) : (
              <div className="relative inline-flex items-center gap-2 w-full">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
                <button onClick={handleNameSave} className="ml-2 text-blue-500">
                  Save
                </button>
              </div>
            )
          ) : (
            <>
              <span>{value}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 text-blue-500"
              >
                Edit
              </button>
            </>
          )
        ) : (
          <span className="text-gray-600">{value}</span>
        )}
      </span>
    </div>
  );
};

export default EditableInfoBox;
