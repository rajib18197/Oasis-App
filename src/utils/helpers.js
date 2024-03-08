import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns/esm";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

function parenthesis(str) {
  let count = 0;
  let arr = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      arr.push("(");
      count = count + 1;
    }
    if (str[i] === ")") {
      if (arr.at(-1) === "(") {
        count = count - 1;
        arr.pop();
      } else {
        count = count + 1;
      }
    }
  }

  console.log(count);
}

parenthesis(")((()");
parenthesis("())");

const counter = function (str) {
  let count = 0;
  let letter = str[0];
  let str2 = "";
  for (let i = 0; i < str.length; i++) {
    const newLetter = str[i];
    if (letter === newLetter) {
      count += 1;
      letter = newLetter;
    } else {
      str2 += `${letter}${count}`;
      count = 1;
      letter = str[i];
    }
  }

  str2 += `${letter}${count}`;

  console.log(str2);
};

counter("abbdcaas");
counter("abcd");
counter("aabbc");
