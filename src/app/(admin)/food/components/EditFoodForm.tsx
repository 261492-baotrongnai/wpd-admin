"use client";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { ConfirmingFood, Food } from "@/types/food.types";
import { useEffect, useState, useTransition } from "react";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import { CheckLineIcon, ChevronDownIcon } from "@/icons";
import { IconX } from "@tabler/icons-react";
import { addFood } from "@/actions/add-food";

interface EditProps {
  food: Food;
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

export default function EditFoodForm({ food, closeModal }: EditProps) {
  const [newFood, setNewFood] = useState<ConfirmingFood>(food);
  const inputName = food.name;
  const [is_confirmed, setIsConfirmed] = useState(food.is_confirmed);
  const [is_rejected, setIsRejected] = useState(food.is_rejected);
  const [categoryError, setCategoryError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useTransition for better loading states with server actions
  const [isPending, startTransition] = useTransition();

  const submitButtonVariant = is_confirmed
    ? "confirm"
    : is_rejected
    ? "danger"
    : "ghost";

  const onConfirm = () => {
    setIsConfirmed(true);
    setIsRejected(false);
    const updatedFood: ConfirmingFood = {
      ...newFood,
      is_confirmed: true,
      is_rejected: false,
    };
    setNewFood(updatedFood);
    setError(null);
  };

  const onReject = () => {
    setIsConfirmed(false);
    setIsRejected(true);
    const updatedFood: ConfirmingFood = {
      ...newFood,
      is_confirmed: false,
      is_rejected: true,
    };
    setNewFood(updatedFood);
    setCategoryError(false);
    setError(null);
  };

  useEffect(() => {
    setNewFood(food);
    setIsConfirmed(food.is_confirmed);
    setIsRejected(food.is_rejected);
  }, [food]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (is_confirmed && !newFood.category) {
      setCategoryError(true);
      return;
    }

    startTransition(async () => {
      try {
        const result = await addFood(newFood);

        if (result.success) {
          console.log("Food item saved successfully");
          closeModal();
        } else {
          setError(result.error || "Failed to save food item");
        }
      } catch (error) {
        console.error("Failed to save food item:", error);
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
          <div className="col-span-2 flex-row">
            <span className="text-gray-500">ชื่อเมนูที่ป้อนมาโดย user : </span>{" "}
            <span className="text-gray-400">{inputName}</span>
          </div>
          <div className="col-span-1">
            <Label>Edited Name</Label>
            <Input
              type="text"
              defaultValue={newFood.name}
              onChange={(e) => {
                const updatedFood = { ...newFood, name: e.target.value };
                setNewFood(updatedFood);
              }}
            />
          </div>

          <div className="col-span-1 relative">
            <Label>Grade</Label>
            <Select
              defaultValue={newFood.grade}
              onChange={(value: string) => {
                const updatedFood = {
                  ...newFood,
                  grade: value as Food["grade"],
                };
                setNewFood(updatedFood);
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
              value={newFood.description}
              onChange={(value: string) => {
                const updatedFood = { ...newFood, description: value };
                setNewFood(updatedFood);
              }}
              className="text-gray-700 dark:text-gray-400"
            />
          </div>

          <div className="col-span-1 relative">
            <Label>Type</Label>
            <Select
              error={categoryError}
              defaultValue={newFood.category}
              onChange={(value: string) => {
                const updatedFood = {
                  ...newFood,
                  category: value as ConfirmingFood["category"],
                };
                setNewFood(updatedFood);
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

          <div className="col-span-2 mt-4 grid grid-cols-1 gap-4">
            <div className="inline-flex items-center justify-start mb-2">
              <button
                type="button"
                onClick={onConfirm}
                disabled={isPending}
                className={
                  is_confirmed
                    ? `relative flex items-center justify-center font-light bg-cute-success-main text-white rounded-full h-8 w-8`
                    : `relative flex items-center justify-center transition-colors text-gray-300 bg-white border border-gray-300 rounded-full hover:text-dark-900 h-8 w-8 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`
                }
              >
                <CheckLineIcon />
              </button>
              <span
                className={
                  is_confirmed
                    ? "ml-2 text-cute-success-main dark:text-green-500 no-wrap"
                    : "ml-2 text-gray-300 dark:text-gray-400 no-wrap"
                }
              >
                ยืนยันรายละเอียดของเมนูอาหารนี้ และเพิ่มลงใน database
              </span>
            </div>
            <div className="inline-flex items-center justify-start">
              <button
                type="button"
                onClick={onReject}
                disabled={isPending}
                className={
                  is_rejected
                    ? "relative flex items-center justify-center font-light bg-cute-orange-main text-white rounded-full h-8 w-8"
                    : `relative flex items-center justify-center text-gray-300 transition-colors bg-white border border-gray-300 rounded-full hover:text-dark-900 h-8 w-8 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`
                }
              >
                <IconX stroke={1.5} />
              </button>
              <span
                className={
                  is_rejected
                    ? "ml-2 text-cute-orange-main dark:text-red-500 no-wrap"
                    : "ml-2 text-gray-300 dark:text-gray-400 no-wrap"
                }
              >
                ปฏิเสธการบันทึกลงใน database
              </span>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-end w-full gap-3 mt-6">
            <Button
              size="sm"
              disabled={(!is_confirmed && !is_rejected) || isPending}
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
