import CompletedTodos from "./CompletedTodos";
import NotCompletedTodos from "./NotCompletedTodos";
import TodoList from "./TodoList";

export default function App() {
  return (
    <div>
      <div>
        <TodoList />
      </div>

      <div>
        <CompletedTodos />
      </div>

      <div>
        <NotCompletedTodos />
      </div>
    </div>
  );
}
