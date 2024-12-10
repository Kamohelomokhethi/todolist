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
      const response = await axios.get(
        "https://todo-server-4bvr.onrender.com/api/todos"
      );
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
        const response = await axios.patch(
          `https://todo-server-4bvr.onrender.com/api/todos/${editId}`,
          {
            status: "pending",
            title: task,
          }
        );
        setTodos((prev) =>
          prev.map((t) => (t._id === editId ? response.data : t))
        );
      } else {
        // Add task
        const response = await axios.post(
          "https://todo-server-4bvr.onrender.com/api/todos",
          {
            title: task,
          }
        );
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
      await axios.delete(
        `https://todo-server-4bvr.onrender.com/api/todos/${id}`
      );
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleDone = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `https://todo-server-4bvr.onrender.com/api/todos/${id}`,
        {
          status: currentStatus === "pending" ? "complete" : "pending",
        }
      );
      setTodos((prev) => prev.map((t) => (t._id === id ? response.data : t)));
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
          {editId ? (
            "Update"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#e8eaed"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          )}
        </button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t._id} className={t.status === "complete" ? "done" : ""}>
            {t.title}
            <div className="manage-btns">
              <button onClick={() => editTask(t._id, t.title)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#e8eaed"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>
              <button onClick={() => deleteTask(t._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#e8eaed"
                >
                  <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                </svg>
              </button>
            </div>
            <button onClick={() => toggleDone(t._id, t.status)}>
              {t.status === "pending" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#e8eaed"
                >
                  <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M400-301 240-461l51-51 109 109 269-269 51 51-320 320Z"/></svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
