"use client";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { ConfirmingFood, Food } from "@/types/food.types";
import { useEffect, useState } from "react";
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

  const [is_confirmed, setIsConfirmed] = useState(food.is_confirmed);
  const [is_rejected, setIsRejected] = useState(food.is_rejected);
  const [is_loading, setIsLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

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
  };

  useEffect(() => {
    setNewFood(food);
  }, [food]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (is_confirmed && !newFood.category) {
      setCategoryError(true);
      return;
    }
    // console.log("Saving food item:", newFood);
    async function saveFood() {
      try {
        // Call the server action to save the food item
        setIsLoading(true);
        await addFood(newFood);
        console.log("Food item saved successfully");
      } catch (error) {
        console.error("Failed to save food item:", error);
      } finally {
        setIsLoading(false);
      }
    }
    saveFood();
    closeModal();
  };

  return (
    <form onSubmit={handleSave}>
      <div className="relative">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          แก้ไขรายละเอียดเมนูอาหาร
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Name</Label>
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
          </div>

          <div className="col-span-1"></div>

          <div className="col-span-2 mt-4 grid grid-cols-1 gap-4">
            <div className="inline-flex items-center justify-start mb-2">
              <button
                type="button"
                onClick={onConfirm}
                className={
                  is_confirmed
                    ? `relative flex items-center justify-center font-light bg-cute-success-main text-white rounded-full h-8 w-8`
                    : `relative flex items-center justify-center  transition-colors  text-gray-300 bg-white border border-gray-300 rounded-full hover:text-dark-900 h-8 w-8 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`
                }
              >
                <CheckLineIcon />
              </button>
              <span
                className={
                  is_confirmed
                    ? " ml-2 text-cute-success-main dark:text-green-500 no-wrap"
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
                className={
                  is_rejected
                    ? "relative flex items-center justify-center font-light bg-cute-orange-main text-white rounded-full h-8 w-8"
                    : `relative flex items-center justify-center text-gray-300 transition-colors bg-white border border-gray-300 rounded-full hover:text-dark-900 h-8 w-8 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`
                }
              >
                <IconX stroke={1.5} />
              </button>
              <span
                className={
                  is_rejected
                    ? " ml-2 text-cute-orange-main dark:text-red-500 no-wrap"
                    : "ml-2 text-gray-300 dark:text-gray-400 no-wrap"
                }
              >
                ปฏิเสธการบันทึกลงใน database
              </span>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-end w-full gap-3 mt-6">
            {!is_loading ? (
              <Button
                size="sm"
                disabled={!is_confirmed && !is_rejected}
                variant={submitButtonVariant}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                size="sm"
                disabled={true}
                variant="ghost"
                className="cursor-not-allowed"
              >
                กำลังดำเนินการ...
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

// export default function EditFoodForm({ food }: EditProps) {

//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Saving changes...");
//   };
//   return (
//     <form>
//       <div className="relative">
//         <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
//           Edit Food Item
//         </h4>

//         <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//           <div className="col-span-1">
//             <Label>Name</Label>
//             <Input type="text" placeholder={food.name} />
//           </div>

//           <div className="col-span-1">
//             <Label>Description</Label>
//             <Input type="text" placeholder={food.description} />
//           </div>
//         </div>

//         <div className="flex items-center justify-end w-full gap-3 mt-6">
//           <Button size="sm" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }
