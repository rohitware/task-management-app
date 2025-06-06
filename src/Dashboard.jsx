import { useState, useEffect } from "react";
import CreateTask from "./tasks/CreateTask";
import EditTask from "./tasks/EditTask"; // Import your EditTask component

const LOCAL_STORAGE_KEY = "tasks";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

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

  // Delete a task
  const deleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800">
        Welcome, {user?.username}!
      </h2>

      <h2 className="text-3xl font-bold mb-4">
        You're now logged in to your dashboard.
      </h2>

      <CreateTask addTask={addTask} />

      {/* Display Tasks */}
      <div className="mt-6 space-y-3">
        {tasks.map((task) => (
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
                  {task.category} | {task.priority} | Deadline: {task.deadline}
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
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
