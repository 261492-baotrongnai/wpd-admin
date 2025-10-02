"use client";
import { getUserPageInfo } from "@/actions/get-user-info";
import { Meal } from "@/types/meal.types";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import UserProfileCard from "../components/UserProfileCard";
import PageContainer from "@/components/container/PageContainer";
import { allMealDateAndGrade } from "@/actions/meal_info";
import { avgSummaryMealByType } from "./calculate_grade";
import SummaryCard from "../components/SummaryCard";
import DateCalendarComponent from "../components/DateCalendar";
import MealsTable from "../components/MealsTable";
import { User } from "@/types/user.types";

export interface SummaryCard {
  avgGrade: "A" | "B" | "C";
  avgScore: number;
  mealCount: {
    gradeA: number;
    gradeB: number;
    gradeC: number;
  };
}

export default function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userProfile, setUserProfile] = useState<{
    displayName: string;
    pictureUrl: string;
  } | null>(null);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [mealDateAndGrades, setMealDateAndGrades] = useState<
    { date: string; grade: string; meals: Meal[] }[]
  >([]);
  const [dailySummary, setDailySummary] = useState<SummaryCard | null>(null);
  const [weeklySummary, setWeeklySummary] = useState<SummaryCard | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<SummaryCard | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  // format selectedDate
  const formattedSelectedDate = useMemo(() => {
    return selectedDate ? selectedDate.format("YYYY-MM-DD") : null;
  }, [selectedDate]);

  const mealsOfSelectedDate = useMemo(() => {
    return mealDateAndGrades.find((item) => item.date === formattedSelectedDate)
      ?.meals;
  }, [formattedSelectedDate, mealDateAndGrades]);

  function renderCalendar() {
    return (
      <>
        <DateCalendarComponent
          mealsDateAndGrades={mealDateAndGrades}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </>
    );
  }

  function renderMealTable() {
    return (
      <MealsTable
        userId={userId}
        date={selectedDate}
        meals={mealsOfSelectedDate}
      />
    );
  }

  useEffect(() => {
    const fetchId = async () => {
      const p = await params;
      setUserId(p.id);
    };
    fetchId();
  }, [params]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!userId) return;

      const { user, profile, meals } = await getUserPageInfo(userId);
      if (profile !== null) {
        setUserProfile({
          displayName: profile.displayName || "No Name",
          pictureUrl: profile.pictureUrl || "",
        });
      }
      if (user == null){
        setUserProfile({
          displayName: "ไม่พบผู้ใช้งาน",
          pictureUrl: "",
        });
      }
      setUser(user);
      if (meals == null) {
        setAllMeals([]);
      } else {
        setAllMeals(meals);
      }
    };
    fetchMeals();
  }, [userId]);

  useEffect(() => {
    console.log("User data:", user);
    console.log("User profile:", userProfile);
    const fetchMealDateAndGrades = async () => {
      try {
        const meals = allMeals;
        const dateAndGrades = await allMealDateAndGrade(meals);
        setMealDateAndGrades(dateAndGrades);
      } catch (error) {
        console.error("Error fetching meal date and grades:", error);
      }
    };
    fetchMealDateAndGrades();
  }, [allMeals, user, userProfile]);

  useEffect(() => {
    if (allMeals.length === 0) return;

    const dailySum = avgSummaryMealByType(allMeals, "daily");
    const weeklySum = avgSummaryMealByType(allMeals, "weekly");
    const monthlySum = avgSummaryMealByType(allMeals, "monthly");

    setDailySummary(dailySum);
    setWeeklySummary(weeklySum);
    setMonthlySummary(monthlySum);
  }, [allMeals]);

  return (
    <PageContainer title="รายละเอียดผู้ใช้ | WanPorDee admin">
      <div className="p-4 max-w-full">
        <UserProfileCard
          user={user}
          pictureUrl={userProfile?.pictureUrl ?? ""}
          displayName={userProfile?.displayName ?? ""}
        />

        <div className="mt-6 grid grid-rows-1 md:grid-cols-3 gap-4">
          <SummaryCard summary={dailySummary} type="daily" />
          <SummaryCard summary={weeklySummary} type="weekly" />
          <SummaryCard summary={monthlySummary} type="monthly" />
        </div>

        <div className="mt-6 flex flex-row gap-4">
          <div className="flex-1 ml-0">{renderCalendar()}</div>
          <div className="flex-2">{renderMealTable()}</div>
        </div>
      </div>
    </PageContainer>
  );
}
