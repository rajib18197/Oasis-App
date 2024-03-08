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

import {
  bookNewCabin,
  getCabin,
  getCabins,
  getOrderedCabin,
} from "./services/getCabins";
import { getMaxValue } from "./utils/helpers";

export const state = {
  cabins: [],
  cabinDetails: {},

  filters: {
    filteredCabins: [],
    value: {
      discount: "all",
      countries: ["all"],
      capacities: ["any"],
      priceRange: 0,
    },
  },

  cart: {
    results: [],
  },

  bookmarks: [],
  ratedCabins: [],

  orderedCabin: {},
  orderId: null,
};

const init = function () {
  const bookmarkStorage = localStorage.getItem("bookmarked-cabins");
  const ratedStorage = localStorage.getItem("rated-cabins");

  if (bookmarkStorage) {
    state.bookmarks = [...JSON.parse(bookmarkStorage)];
  }

  if (ratedStorage) {
    state.ratedCabins = [...JSON.parse(ratedStorage)];
  }
};
init();

const persistRating = function () {
  localStorage.setItem("rated-cabins", JSON.stringify(state.ratedCabins));
};

export const addRating = function (cabin, rate) {
  const cabinToRate = state.ratedCabins.find((el) => el.id === cabin.id);
  if (cabinToRate) {
    cabinToRate.rating = rate;
  } else {
    state.ratedCabins.push(cabin);
  }

  if (state.cabinDetails.id === cabin.id) cabin.rating = rate;

  persistRating();
};

export const loadOrderedCabin = async function (id) {
  const data = await getOrderedCabin(id);
  console.log(data);
  state.orderedCabin = {
    ...data,
    totalPrice: data.guests * data.luxuryCabins.regularPrice,
  };
};

const persistBookmark = function () {
  localStorage.setItem("bookmarked-cabins", JSON.stringify(state.bookmarks));
};

export const addBookMark = function (cabin) {
  state.bookmarks.push(cabin);

  if (cabin.id === state.cabinDetails.id) state.cabinDetails.bookmarked = true;
  persistBookmark();
};

export const deleteBookMark = function (id) {
  const cabinToDeleteIndex = state.bookmarks.findIndex(
    (cabin) => cabin.id === id
  );
  state.bookmarks.splice(cabinToDeleteIndex, 1);

  if (state.cabinDetails.id === id) state.cabinDetails.bookmarked = false;
  persistBookmark();
};

export const updateGuests = function (guest) {
  state.cabinDetails.facilities = state.cabinDetails.facilities.map((el) => {
    console.log(el);
    if (el.quantity) {
      return {
        quantity: (el.quantity * guest) / state.cabinDetails.guests,
        description: el.description,
      };
    }

    return { quantity: el.quantity, description: el.description };
  });

  state.cabinDetails.guests = guest;
};

export const loadCabinDetails = async function (id) {
  const data = await getCabin(id);
  console.log(data);
  const cabinDetailsData = {
    ...data,
    facilities: data.description.split(",").map((el) => {
      if (Number(el.trim()[0])) {
        return {
          quantity: Number(el.trim()[0]),
          description: el.trim().slice(1),
        };
      }

      return { quantity: "", description: el.trim() };
    }),
    guests: 1,

    bookmarked: state.bookmarks.find((book) => book.id === data.id)
      ? true
      : false,

    rating: state.ratedCabins.find((cabin) => cabin.id === data.id)
      ? state.ratedCabins.find((cabin) => cabin.id === data.id).rating
      : 0,
  };
  console.log(cabinDetailsData);
  state.cabinDetails = cabinDetailsData;
};

export const bookCabin = async function ({ fullName, email, address }) {
  const order = state.cart.results.map((cabin) => ({
    cabinId: cabin.id,
    fullName,
    email,
    address,
    guests: cabin.guests,
    totalPrice: cabin.guests * cabin.regularPrice,
  }));

  console.log(order);

  const newOrderInfo = await bookNewCabin(...order);
  console.log(newOrderInfo);
  state.orderId = newOrderInfo[0].id;
  state.cart.results = [];
};

export const addToCart = function (id) {
  const cabinToAdd = state.filters.filteredCabins.find(
    (cabin) => cabin.id === id
  );

  state.cart.results.push({ ...cabinToAdd, guests: 1 });
  console.log(cabinToAdd);
};

export const deleteFromCart = function (id) {
  state.cart.results = state.cart.results.filter((el) => el.id !== id);
};

export const updateCartGuests = function (value, id) {
  console.log(value, id);
  state.cart.results = state.cart.results.map((res) => {
    return res.id === id ? { ...res, guests: value } : res;
  });
};

export const loadCabins = async function () {
  const cabinsData = await getCabins();
  state.cabins = cabinsData;
};

export const clearFilters = function () {
  state.filters = {
    filteredCabins: state.cabins,
    value: {
      discount: "all",
      countries: ["all"],
      capacities: ["any"],
      priceRange: getMaxValue(state.cabins, "regularPrice"),
    },
  };
};

export const removeFilterValue = function (value, field) {
  state.filters.totalCount -= 1;
  state.filters.value[field] = state.filters.value[field].filter((el) => {
    if (typeof el === "number") {
      return el !== Number(value);
    }

    return el !== value;
  });

  if (state.filters.value[field].length === 0) {
    state.filters.value[field] = field === "countries" ? ["all"] : ["any"];
  }
};

export const cabinsOperations = function ({
  discount = "",
  country = "",
  capacity = "",
  priceRange = 0,
} = {}) {
  let filteredCabins = state.cabins;

  if (discount) state.filters.value.discount = discount;

  if (country) {
    state.filters.value.countries =
      state.filters.value.countries[0] === "all"
        ? []
        : state.filters.value.countries;

    state.filters.value.countries =
      country === "all" ? ["all"] : [...state.filters.value.countries, country];
  }

  if (capacity) {
    state.filters.value.capacities =
      state.filters.value.capacities[0] === "any"
        ? []
        : state.filters.value.capacities;

    state.filters.value.capacities =
      capacity === "any"
        ? ["any"]
        : [...state.filters.value.capacities, capacity];
  }

  if (priceRange) {
    state.filters.value.priceRange = priceRange;
  }

  const filterDiscount = state.filters.value.discount;
  const filterCountries = state.filters.value.countries;
  const filterCapacities = state.filters.value.capacities;
  const filterPriceRange = state.filters.value.priceRange;

  if (
    filterDiscount === "all" &&
    filterCapacities[0] === "any" &&
    filterCountries[0] === "all"
  )
    filteredCabins = state.cabins;

  if (filterDiscount && filterDiscount === "with-discount")
    filteredCabins = state.cabins.filter((cabin) => cabin.discount > 0);

  if (filterDiscount && filterDiscount === "without-discount")
    filteredCabins = state.cabins.filter((cabin) => cabin.discount === 0);

  if (filterCountries[0] !== "all" && filterCountries.length > 0) {
    const countriesCabins = filteredCabins.filter((cabin) => {
      return filterCountries.includes(
        cabin.address.split(",").at(-1).trim().toLowerCase()
      );
    });

    filteredCabins = countriesCabins;
  }

  if (filterCapacities[0] !== "any" && filterCapacities.length > 0) {
    const cabins = filteredCabins.filter((cabin) => {
      return filterCapacities.includes(Number(cabin.maxCapacity));
    });

    filteredCabins = cabins;
  }

  // priceRange calculation

  if (filterPriceRange) {
    filteredCabins = filteredCabins.filter((cabin) => {
      return cabin.regularPrice <= filterPriceRange;
    });
  }

  state.filters.filteredCabins = filteredCabins;
  console.log(state.filters.filteredCabins);
};
