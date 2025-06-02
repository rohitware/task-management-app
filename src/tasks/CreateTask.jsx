import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const CreateTask = ({ addTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return alert("Title is required");

    const newTask = { ...form, id: uuidv4() };
    addTask(newTask);
    setForm({
      title: "",
      description: "",
      category: "",
      priority: "Medium",
      deadline: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-4 border rounded bg-white shadow"
    >
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default CreateTask;
