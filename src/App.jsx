import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch tasks from the API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://todo-server-4bvr.onrender.com/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addOrUpdateTask = async () => {
    if (!task.trim()) {
      alert("Please add a task");
      return;
    }

    try {
      if (editId) {
        // Update task
        const response = await axios.patch(`https://todo-server-4bvr.onrender.com/api/todos/${editId}`, {
          status: "pending",
          title: task,
        });
        setTodos((prev) =>
          prev.map((t) => (t._id === editId ? response.data : t))
        );
      } else {
        // Add task
        const response = await axios.post("https://todo-server-4bvr.onrender.com/api/todos", {
          title: task,
        });
        setTodos((prev) => [...prev, response.data]);
      }
      setTask("");
      setEditId(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-server-4bvr.onrender.com/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleDone = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`https://todo-server-4bvr.onrender.com/api/todos/${id}`, {
        status: currentStatus === "pending" ? "complete" : "pending",
      });
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const editTask = (id, title) => {
    setTask(title);
    setEditId(id);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button onClick={addOrUpdateTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t._id} className={t.status === "complete" ? "done" : ""}>
            {t.title}
            <div className="manage-btns">
              <button onClick={() => editTask(t._id, t.title)}>Edit</button>
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </div>
            <button onClick={() => toggleDone(t._id, t.status)}>
              {t.status === "pending" ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
