import { Meal } from "@/types/meal.types";

export function avgSummaryMealByType(
  meal: Meal[],
  type: "daily" | "weekly" | "monthly"
): {
  avgGrade: "A" | "B" | "C";
  avgScore: number;
  mealCount: {
    gradeA: number;
    gradeB: number;
    gradeC: number;
  };
} | null {
  const filteredMeals = filterMealsByType(meal, type);
  if (filteredMeals.length === 0) {
    return null;
  }
  let totalScore = 0;
  filteredMeals.forEach((meal) => {
    totalScore += meal.avgScore;
  });
  const avgScore = totalScore / filteredMeals.length;
  const avgGrade = scoreToGradeForRuleBased(avgScore);
  const totalGradeCount = filteredMeals.reduce(
    (sum, meal) => {
      switch (meal.avgGrade) {
        case "A":
          sum.gradeA++;
          break;
        case "B":
          sum.gradeB++;
          break;
        case "C":
          sum.gradeC++;
          break;
      }
      return sum;
    },
    { gradeA: 0, gradeB: 0, gradeC: 0 }
  );

  return {
    avgGrade: avgGrade as "A" | "B" | "C",
    avgScore,
    mealCount: totalGradeCount,
  };
}

function filterMealsByType(
  meals: Meal[],
  type: "daily" | "weekly" | "monthly"
): Meal[] {
  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  switch (type) {
    case "daily": {
      // local today date (YYYY-MM-DD) and compare using local date parts to avoid UTC shift

      return meals.filter((meal) => {
        const mealDate = new Date(meal.createdAt);
        const mealLocal = `${mealDate.getFullYear()}-${String(
          mealDate.getMonth() + 1
        ).padStart(2, "0")}-${String(mealDate.getDate()).padStart(2, "0")}`;
        return mealLocal === localToday;
      });
    }
    case "weekly": {
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 6)
      );
      return meals.filter((meal) => {
        const mealDate = new Date(meal.createdAt);
        return mealDate >= startOfWeek && mealDate <= endOfWeek;
      });
    }
    case "monthly": {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return meals.filter((meal) => {
        const mealDate = new Date(meal.createdAt);
        return mealDate >= startOfMonth && mealDate <= endOfMonth;
      });
    }
  }
}

function scoreToGradeForRuleBased(score: number): string {
  if (score >= 6) {
    return "A";
  } else if (score >= 2) {
    return "B";
  }
  return "C";
}
