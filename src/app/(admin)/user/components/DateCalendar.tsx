import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { JSX, useEffect, useMemo, useState } from "react";
import { Meal } from "@/types/meal.types";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

export default function DateCalendarComponent({
  mealsDateAndGrades,
  selectedDate,
  setSelectedDate,
}: {
  mealsDateAndGrades: { date: string; grade: string; meals: Meal[] }[];
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
  },[])

  useEffect(() => {
    setIsLoading(mealsDateAndGrades.length === 0);
  }, [mealsDateAndGrades]);

  const gradeByDate = useMemo(() => {
    const map = new Map<string, "A" | "B" | "C">();
    for (const item of mealsDateAndGrades) {
      const g = (item.grade || "").toUpperCase();
      if (g === "A" || g === "B" || g === "C") map.set(item.date, g);
    }
    return map;
  }, [mealsDateAndGrades]);

  function getBgForGrade(grade: "A" | "B" | "C") {
    switch (grade) {
      case "A":
        return "#bcec8e"; // green
      case "B":
        return "#fedf89"; // yellow
      case "C":
        return "#f3704d"; // red
    }
  }

  function ColoredDay(props: PickersDayProps & { day: Dayjs }): JSX.Element {
    const { day, selected, outsideCurrentMonth, ...other } = props;
    const key = day.format("YYYY-MM-DD");
    const grade = gradeByDate.get(key);
    const bg = grade ? getBgForGrade(grade) : undefined;

    return (
      <PickersDay
        {...other}
        day={day}
        selected={selected}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          borderRadius: "100%",
          ...(selected
            ? {
                backgroundColor: "#000 !important",
                color: "#fff !important",
                "&.Mui-selected": {
                  backgroundColor: "#000 !important",
                  color: "#fff !important",
                },
                "&:hover": {
                  backgroundColor: "#000 !important",
                  color: "#fff !important",
                },
                "&:focus": {
                  backgroundColor: "#000 !important",
                  color: "#fff !important",
                },
              }
            : bg
            ? {
                backgroundColor: bg,
                "&:hover": { backgroundColor: "#000", color: "#fff" },
              }
            : {}),
        }}
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        slots={{ day: ColoredDay }}
        disableFuture
      />
    </LocalizationProvider>
  );
}
