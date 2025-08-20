import { Food } from "./food.types";
import { User } from "./user.types";

export interface Meal {
  id: number;
  imageName: string | null;
  mealType: "breakfast" | "lunch" | "dinner";
  avgScore: number;
  avgGrade: "A" | "B" | "C";
  maxScore: number;
  lowestGrade: "A" | "B" | "C";
  user: User | null;
  foods: Food[] | null;
  createdAt: string;
  updatedAt: string;
}
