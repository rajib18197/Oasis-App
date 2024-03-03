import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { selectFilterValue } from "./filterSelectors";
import { changeFilterValue } from "./filterSlice";
import {
  allTodos,
  memoizedCompletedTodos,
  memoizedNotCompletedTodos,
} from "./todoSelectors";

export default function TodoList() {
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();

  const filteredTodos = useSelector((state) => {
    if (filterValue === "all") return allTodos(state);
    if (filterValue === "completed") return memoizedCompletedTodos(state);
    if (filterValue === "not-completed")
      return memoizedNotCompletedTodos(state);
  });

  console.log("All Todos render");

  return (
    <div className="flex flex-col gap-8 text-stone-800 text-2xl">
      <div className="text-stone-200 flex gap-8">
        <button onClick={() => dispatch(changeFilterValue("all"))}>All</button>
        <button onClick={() => dispatch(changeFilterValue("completed"))}>
          Completed
        </button>
        <button onClick={() => dispatch(changeFilterValue("not-completed"))}>
          Not Completed
        </button>
      </div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}


// Takes from a commentary sanjay manjrekar when virat kohli plays a game:

// he is at the stage in his career, his confidence is so good, runs every time he comes into bat. It's almost like he thinks okay next ball I am gonna play it here. he is hitting the ball, he sees gap in the field. he thinks like kind of this way - "okay there's a nice gap there, that's where I'M gonna hit".

// he just sees gap and put the ball there.

// he is got this GPS in his mind. 

// He is Gonna Steal an absolutely Unwinnable Game - justin langer