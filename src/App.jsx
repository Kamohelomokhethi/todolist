import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditIt] = useState(null);

  const addTask = () => {
    if (!task.trim()) {
      alert("Please enter a valid task!");
      return;
    }

    if (editId !== null) {
      const updated = data.map((t) =>
        t.id === editId ? { ...t, name: task } : t
      );
      setData(updated);
      setEditIt(null);
    } else {
      const currentDate = new Date().toLocaleDateString();
      setData([...data, { id: Date.now(), name: task, date: currentDate }]);
    }
    setTask(""); // Clear the input field
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = (id) => {
    const filtered = data.filter((t) => t.id !== id);
    setData(filtered);
  };

  const editTask = (id) => {
    const toEdit = data.find((t) => t.id === id);

    if (toEdit) {
      setTask(toEdit.name);
      setEditIt(id);
    }
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
        <button onClick={addTask}>
          {editId ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#e8eaed"
            >
              <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
            </svg>
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
        {data.map((t) => (
          <li key={t.id}>
            {t.name}
            <div className="manage-btns">
              <button onClick={() => editTask(t.id)}>
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

              <button onClick={() => deleteTask(t.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#e8eaed"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
            <small>{t.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
