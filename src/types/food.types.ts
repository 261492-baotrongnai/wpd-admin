import { Meal } from "./meal.types";

export interface Food {
  meal: Meal | null;
  key: string | null;
  id: number;
  name: string;
  description: string;
  grade: "A" | "B" | "C";
  grading_by_ai: boolean;
  is_confirmed: boolean;
  is_rejected: boolean;
}

export interface ConfirmingFood {
  id: number;
  name: string;
  description: string;
  grade: "A" | "B" | "C";
  grading_by_ai: boolean;
  is_confirmed: boolean;
  is_rejected: boolean;
  meal: Meal | null;
  key: string | null;
  category?: "อาหาร-ของว่าง" | "เครื่องดื่ม" | "ผลไม้" | "ธัญพืช";
}
