import { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styled from "styled-components";

const StyledCalender = styled.div`
  max-width: 40rem;
  background-color: #121212;
  color: white;
`;

const MonthContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orangered;
`;

const MonthName = styled.h4``;

const Weekdays = styled.div`
  padding: 1rem;
  background-color: #9089f8;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  width: 100%;
  justify-items: center;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-items: center;
`;

const Day = styled.div``;

const Button = styled.button`
  background-color: #1f0a1f;
  border: none;
  outline: none;
`;

const calender = {
  months: [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 29 },
    { name: "Mar", days: 31 },
    { name: "Apr", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "Jul", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
  ],

  Weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export default function Calender() {
  const [count, setCount] = useState({
    month: 0,
    year: new Date().getFullYear(),
  });

  const [selectedDate, setSelectedDate] = useState();

  const firstDay = new Date(count.year, count.month, 1).getDay();

  const totalDays = calender.months[count.month].days;
  const currentMonth = calender.months[count.month].name;
  const currentYear = count.year;

  function handleIncrease() {
    setCount((cur) => {
      const month = cur.month >= 11 ? 0 : cur.month + 1;
      const year = cur.month >= 11 ? cur.year + 1 : cur.year;
      return { month, year };
    });
  }

  function handleDecrease() {
    setCount((cur) => {
      const month = cur.month <= 11 && cur.month > 0 ? cur.month - 1 : 11;
      const year = cur.month <= 11 && cur.month > 0 ? cur.year : cur.year - 1;
      return { month, year };
    });
  }

  function handleSelect(date) {
    const month = count.month + 1;
    setSelectedDate(`${date}/${month}/${count.year}`);
  }

  return (
    <StyledCalender>
      <h3>Selected Date- {selectedDate || "No Selection Yet"}</h3>
      <MonthContainer>
        <Button onClick={handleDecrease}>
          <HiArrowLeft />
        </Button>
        <MonthName>
          {currentMonth} {count.month} {firstDay} {currentYear}
        </MonthName>
        <Button onClick={handleIncrease}>
          <HiArrowRight />
        </Button>
      </MonthContainer>

      <Weekdays>
        {calender.Weekdays.map((day) => (
          <p key={day}>{day}</p>
        ))}
      </Weekdays>

      <DaysContainer>
        {Array.from({ length: totalDays + firstDay }, (_, i) =>
          i >= firstDay && i + 1 <= totalDays + firstDay ? (
            <Day key={i + 1} onClick={() => handleSelect(i - firstDay + 1)}>
              {i - firstDay + 1}
            </Day>
          ) : (
            <Day key={i + 1}></Day>
          )
        )}
      </DaysContainer>
    </StyledCalender>
  );
}
