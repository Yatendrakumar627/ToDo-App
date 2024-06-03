import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import './todoList.css'; // Assuming you create a CSS file for custom styles

export const TodoList = (props) => {
  const { todos, GetData, setTodos, url } = props;

  // Check TaskCompleted
  const handleCheckTask = (id) => {
    const data = todos.find((todo) => todo.id === id);
    data.completed = !data.completed;
    const updatedTask = {
      completed: data.completed,
    };
    setTodos([...todos]);
    fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    toast.success("Task updated successfully");
  };

  // Delete Todo Function From the List
  const deleteTodo = async (id) => {
    const result = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    const newTodo = todos.filter((to) => to.id !== id);
    if (result.ok) {
      setTodos(newTodo);
      toast.success("Todo deleted successfully");
    } else {
      toast.error("Error deleting todo");
    }
  };

  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <div key={todo.id} className="input-group mb-3 todo-item">
          <li className={`form-control todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </li>
          <i
            className={
              todo.completed
                ? "bi bi-check-circle-fill check-icon"
                : "bi bi-check-circle check-icon"
            }
            onClick={() => handleCheckTask(todo.id)}
          ></i>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => GetData(todo.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
