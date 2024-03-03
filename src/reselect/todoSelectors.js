import { createSelector } from "reselect";

export const allTodos = (state) => {
  console.log("state all todos");
  return state.todos.todos;
};

export const memoizedCompletedTodos = createSelector(allTodos, (todos) =>{
    console.log('memo completed');
    return todos.filter((t) => t.completed)
}
);

export const memoizedNotCompletedTodos = createSelector(allTodos, (todos) => {
  console.log("memo not completed");
  return todos.filter((t) => !t.completed);
});
