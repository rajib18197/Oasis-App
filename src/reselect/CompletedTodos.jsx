import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { memoizedCompletedTodos } from "./todoSelectors";

export default function CompletedTodos() {
  const completedTodos = useSelector(memoizedCompletedTodos);
  
  console.log('Completed render');
  return (
    <div className="flex flex-col gap-8 text-stone-800 text-2xl">
      <h2>Completed Todos</h2>
      {completedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
