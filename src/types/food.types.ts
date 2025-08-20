import { Meal } from "./meal.types";

export interface Food {
  meal: Meal | null;
  key: string | null;
  id: number;
  name: string;
  description: string;
  grade: 'A' | 'B' | 'C';
  grading_by_ai: boolean;
  is_confirmed: boolean;
  is_rejected: boolean;
}
