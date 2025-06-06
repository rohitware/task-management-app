import { useState, useEffect } from "react";

const EditTask = ({ task, updateTask, onCancel }) => {
  const [form, setForm] = useState({ ...task });

  useEffect(() => {
    setForm({ ...task });
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return alert("Title is required");

    updateTask(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-4 border rounded bg-yellow-50 shadow"
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
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTask;
