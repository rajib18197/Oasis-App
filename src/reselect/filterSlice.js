import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterValue: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterValue(state, action) {
      state.filterValue = action.payload;
    },
  },
});

export const { changeFilterValue } = filterSlice.actions;
export default filterSlice.reducer;
