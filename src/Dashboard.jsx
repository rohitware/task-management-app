import { useState, useEffect } from "react";
import CreateTask from "./tasks/CreateTask";
import EditTask from "./tasks/EditTask";

const LOCAL_STORAGE_KEY = "tasks";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTaskId(null);
  };

  const deleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  // Filter tasks by title
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800">
        Welcome, {user?.username}!
      </h2>

      <h2 className="text-3xl font-bold mb-4">
        You're now logged in to your dashboard.
      </h2>

      <CreateTask addTask={addTask} />

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>

      {/* Display Tasks */}
      <div className="mt-6 space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="p-4 border rounded bg-gray-50 shadow">
              {editingTaskId === task.id ? (
                <EditTask
                  task={task}
                  updateTask={updateTask}
                  onCancel={cancelEdit}
                />
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-600">
                    {task.category} | {task.priority} | Deadline:{" "}
                    {task.deadline}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      className="text-sm bg-yellow-400 text-white px-3 py-1 rounded"
                      onClick={() => setEditingTaskId(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
