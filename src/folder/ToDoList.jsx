import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../folder/style.css";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  const ChangeCheckbox = useMemo(
    () => (todoId) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [setTodos]
  );

  useEffect(() => {
    const fetchTodos = () => {
      try {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((data) => setTodos(data))
          .catch((error) => console.error("დაფიქსირდა შეცდომა", error));
      } catch (error) {
        console.error("დაფიქსირდა შეცდომა", error);
      }
    };

    fetchTodos();
  }, []);

  const ChangeInput = useCallback((e) => {
    setNewTask(e.target.value);
  }, []);

  const AddNewTask = () => {
    if (newTask.trim().length <= 0) {
      alert("გთხოვთ შეავსოთ ველი");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title: newTask,
      checked: false,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setNewTask("");
  };

  return (
    <div className="main-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Create new task"
          value={newTask}
          onChange={ChangeInput}
        />
        <button onClick={AddNewTask}>Add</button>
      </div>
      <div className="list-container">
        {todos.map((todo) => (
          <div key={todo.id} className="list">
            <div>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => ChangeCheckbox(todo.id)}
              />
              <p className={todo.checked ? "checked" : ""}>{todo.title}</p>
            </div>
            <div className="colorful-divs"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ToDoList);