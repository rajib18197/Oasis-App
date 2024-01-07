import { useEffect, useState } from "react";

const workouts = [
  {
    name: "Full-body workout",
    numExercises: partOfDay === "AM" ? 9 : 8,
  },
  {
    name: "Arms + Legs",
    numExercises: 6,
  },
  {
    name: "Arms only",
    numExercises: 3,
  },
  {
    name: "Legs only",
    numExercises: 4,
  },
  {
    name: "Core only",
    numExercises: partOfDay === "AM" ? 5 : 4,
  },
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function Workout() {
  const [date, setDate] = useState(formatDate(new Date()));

  useEffect(function () {
    const timer = setInterval(() => {
      setDate(formatDate(new Date()));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h1>For Your Workout on {date}</h1>
    </div>
  );
}
