import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const query = filter === "all" ? "" : `?status=${filter}`;
        const res = await api.get(`/tasks${query}`);
        setTasks(res.data);
      } catch {
        toast.error("Failed to Load Tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [tasks]);

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/tasks", data);
      setTasks((prev) => [res.data, ...prev]);
      toast.success("Task added Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add tasks");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks((prev) => {
        prev.map((t) => (t._id === id ? res.data : t));
      });
      toast.success("Task Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?"))
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((t) => t._id !== id));
        toast.info("Task Deleted.");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete this task"
        );
      }
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) => 
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (error){
        toast.error(error.response?.data?.message || "Failed to Update the Task")
    }
  };

  return (
    <div>
        
    </div>
  );
};

export default Dashboard;
