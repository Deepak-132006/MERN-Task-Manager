import React, { useEffect, useState } from "react";
import Cancel from "../assets/cancel.png"

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
    <div className="flex flex-col justify-center items-center min-h-screen fixed inset-0 bg-black/50 backdrop-blur-sm z-100">
      <div className="bg-white py-8 px-8 flex flex-col gap-5 rounded-xl w-[400px]">
        <div className="flex justify-between ">
          <h3 className="text-[22px]">{isEdit ? "Edit Task" : "Add Task"}</h3>
          <div onClick={onClose} className="w-5 mt-1.5">
            <img src={Cancel} alt="" />
          </div>
        </div>

        <span className="border-b h-px text-[#aba9a9]"> </span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <p>
              Title<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="border-[#2C666E] focus:outline-none border-2 p-2 rounded-md bg-[#bdbdbd] w-full mt-2"
            />
          </div>
          <div>
            <p>
              Description<span className="text-gray-400"> (Optional)</span>
            </p>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border-2 border-black p-2 rounded-md bg-[#bdbdbd] w-full mt-2 focus:outline-none"
            />
          </div>
          <div className="flex gap-5">
            <button
              type="button"
              className="px-6 py-2 bg-[#e92e2e] rounded text-white w-full"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-[#2C666E] rounded w-full"
            >
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
