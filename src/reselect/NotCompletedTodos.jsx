import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { memoizedNotCompletedTodos } from "./todoSelectors";

export default function NotCompletedTodos() {
  const notCompletedTodos = useSelector(memoizedNotCompletedTodos);

  console.log('Not Completed Render');

  return (
    <div className="flex flex-col gap-8 text-stone-800 text-2xl">
      <h2>Not Completed Todos </h2>
      {notCompletedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
