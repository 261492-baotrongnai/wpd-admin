"use server";

import { Food } from "@/types/food.types";
import { Meal } from "@/types/meal.types";

export async function MealsInDate(meals: Meal[], date: string) {
  return meals.filter((meal) => meal.createdAt === date);
}

export async function allMealDateAndGrade(
  meals: Meal[]
): Promise<{ date: string; grade: string; meals: Meal[] }[]> {
  // Group meals by date in the client's timezone and calculate avgScore for each date
  const groupedByDate: Record<string, { totalScore: number; count: number }> =
    {};

  // Get the client's local timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  for (const meal of meals) {
    // Convert the meal's createdAt to the client's local date
    const localDate = new Date(meal.createdAt).toLocaleDateString("en-CA", {
      timeZone, // Use the client's timezone
    }); // Format as YYYY-MM-DD

    if (!groupedByDate[localDate]) {
      groupedByDate[localDate] = { totalScore: 0, count: 0 };
    }
    groupedByDate[localDate].totalScore += meal.avgScore;
    groupedByDate[localDate].count += 1;
  }
  console.log("Grouped by date:", groupedByDate);

  // Determine if grading should follow the rule: true if any food in any meal has grading_by_rule === true
  const gradingByRule = meals.some((meal) =>
    meal.foods?.some((f: Food) => f.grading_by_rule === true)
  );

  // Transform grouped data into an array of { date, avgScore }
  const result = Object.entries(groupedByDate).map(
    ([date, { totalScore, count }]) => {
      // find meals for this local date using same timezone formatting
      const mealsForDate = meals.filter(
        (meal) =>
          new Date(meal.createdAt).toLocaleDateString("en-CA", { timeZone }) ===
          date
      );
      return {
        date,
        meals: mealsForDate,
        grade: gradingByRule
          ? scoreToGradeForRuleBased(totalScore / count)
          : scoreToGrade(totalScore / count),
      };
    }
  );

  console.log("All progress grouped by client timezone:", result);
  return result;
}

function scoreToGrade(score: number): string {
  if (score <= 1.5) {
    return "A";
  }
  if (score <= 2.5) {
    return "B";
  }
  return "C";
}

function scoreToGradeForRuleBased(score: number): string {
  if (score >= 6) {
    return "A";
  } else if (score >= 2) {
    return "B";
  }
  return "C";
}
