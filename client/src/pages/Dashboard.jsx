import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import api from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const query = filter === "all" ? "" : `?status=${filter}`;
        const res = await api.get(`/tasks${query}`);
        setTasks(res.data);
      } catch (error) {
        console.error("Fetch tasks Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filter]);

  const handleAdd = async () => {
    try {
      const res = await api.get("/tasks", data);
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Add Error: ", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Update Error", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete Error: ", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Toggle Error: ", error);
    }
  };
  

  return (
    <div>
      <NavBar />
      <TaskCard
        key={task._id}
        task={task}
        onEdit={() => {
          setEditTask(task);
          setShowForm(true);
        }}
        onDelete={() => handleDelete(task._id)}
        onToggle={() => handleToggle(task._id)}
      />
      <TaskForm />
    </div>
  );
};

export default Dashboard;
