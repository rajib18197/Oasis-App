import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, text: "read books", completed: false },
    { id: 2, text: "story telling", completed: false },
    { id: 3, text: "best version", completed: false },
    { id: 4, text: "keep brainstorming", completed: false },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleCompleted(state, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : { ...todo }
      );
    },
  },
});

export const { toggleCompleted } = todoSlice.actions;
export default todoSlice.reducer;
