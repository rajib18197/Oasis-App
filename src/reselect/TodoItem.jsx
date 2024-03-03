import { useDispatch } from "react-redux";
import { toggleCompleted } from "./todoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  console.log('Individual Todo Render');

  return (
    <div className="bg-stone-200 flex gap-8">
      <span>
        {todo.text} || {todo.completed ? "Completed" : "Not Completed"}
      </span>
      <button onClick={() => dispatch(toggleCompleted(todo.id))}>
        Change
      </button>
    </div>
  );
}
