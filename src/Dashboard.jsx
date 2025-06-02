import { useState, useEffect } from "react";
import CreateTask from "./tasks/CreateTask";

const LOCAL_STORAGE_KEY = "tasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <CreateTask addTask={addTask} />

      {/* Display Tasks */}
      <div className="mt-6 space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded bg-gray-50 shadow">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">
              {task.category} | {task.priority} | Deadline: {task.deadline}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
