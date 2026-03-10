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
      if(!form.title.trim()) return alert("Title required")
        isEdit ? onSubmit(task._id, form) : 
    }
  return <div></div>;
};

export default TaskForm;
