import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice,
    filters: filterSlice,
  },
});

export default store;
