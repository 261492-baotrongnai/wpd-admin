"use client";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useEffect, useState, useTransition } from "react";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import { ChevronDownIcon } from "@/icons";
// import { IconX } from "@tabler/icons-react";
import { Menu } from "@/types/menu.types";
import { updateMenu } from "@/actions/update_menu";

interface EditProps {
  menu: Menu;
  closeModal: () => void;
}

const GradeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

const CategoryOptions = [
  { value: "อาหาร-ของว่าง", label: "อาหาร-ของว่าง" },
  { value: "เครื่องดื่ม", label: "เครื่องดื่ม" },
  { value: "ผลไม้", label: "ผลไม้" },
  { value: "ธัญพืช", label: "ธัญพืช" },
];

export default function EditMenuForm({ menu, closeModal }: EditProps) {
  const [newMenu, setNewMenu] = useState<Menu>(menu);
  const [categoryError, setCategoryError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useTransition for better loading states with server actions
  const [isPending, startTransition] = useTransition();

  const submitButtonVariant = "ghost";

  useEffect(() => {
    setNewMenu(menu);
  }, [menu]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newMenu.category) {
      setCategoryError(true);
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateMenu(newMenu);

        if (result.success) {
          console.log("Menu item saved successfully");
          closeModal();
        } else {
          setError(result.error || "Failed to save menu item");
        }
      } catch (error) {
        console.error("Failed to save menu item:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSave}>
      <div className="relative">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          แก้ไขรายละเอียดเมนูอาหาร
        </h4>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Name</Label>
            <Input
              type="text"
              defaultValue={newMenu.name}
              onChange={(e) => {
                const updatedMenu = { ...newMenu, name: e.target.value };
                setNewMenu(updatedMenu);
              }}
            />
          </div>

          <div className="col-span-1 relative">
            <Label>Grade</Label>
            <Select
              defaultValue={newMenu.grade}
              onChange={(value: string) => {
                const updatedMenu = {
                  ...newMenu,
                  grade: value as Menu["grade"],
                };
                setNewMenu(updatedMenu);
              }}
              options={GradeOptions}
              className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-12 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>

          <div className="col-span-2">
            <Label>Description</Label>
            <TextArea
              value={newMenu.description || ""}
              placeholder="No description yet"
              onChange={(value: string) => {
                const updatedMenu = { ...newMenu, description: value };
                setNewMenu(updatedMenu);
              }}
              className="text-gray-700 dark:text-gray-400"
            />
          </div>

          <div className="col-span-1 relative">
            <Label>Type</Label>
            <Select
              error={categoryError}
              defaultValue={newMenu.category}
              onChange={(value: string) => {
                const updatedMenu = {
                  ...newMenu,
                  category: value as Menu["category"],
                };
                setNewMenu(updatedMenu);
                setCategoryError(false);
              }}
              options={CategoryOptions}
              className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-12 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
            {categoryError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                กรุณาเลือกประเภทอาหาร
              </p>
            )}
          </div>

          <div className="col-span-1"></div>

          <div className="col-span-2 flex items-center justify-end w-full gap-3 mt-6">
            <Button
              size="sm"
              disabled={isPending}
              variant={submitButtonVariant}
            >
              {isPending ? "กำลังดำเนินการ..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
