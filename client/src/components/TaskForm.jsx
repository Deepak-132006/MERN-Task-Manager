import React, { useEffect, useState } from "react";

const TaskForm = ({ task, onSubmit, onClose }) => {
  const isEdit = !!task;
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  useEffect(() => {
    if (isEdit) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [task]);
  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title required");
    isEdit ? onSubmit(task._id, form) : onSubmit(form);
    onClose();
  };
  return (
    <div>
      <h3>{isEdit ? "Edit Task" : "Add Task"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        <button type="submit">{isEdit ? "Save" : "Add"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
