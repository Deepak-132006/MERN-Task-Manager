import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import api from "../api/axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/tasks", data);
      setTasks((prev) => [res.data, ...prev]);
      toast("Task added successfully!");
    } catch (err) {
      console.error("Add Error: ", err);
      toast.error("Task added failed!");

    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      toast("Updated Successfully!");
    } catch (err) {
      console.error("Update Error", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast("Deleted Successfully")
    } catch (error) {
      console.error("Delete Error: ", error);
      toast.error("Unable to Delete")
    }
    setDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 500);
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Toggle Error: ", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <NavBar />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        onAdd={() => setShowForm(true)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        {tasks.length === 0 ? (
          <p>No Tasks yet.</p>
        ) : (
          tasks.map((task) => (
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
          ))
        )}
      </div>
      {showForm && (
        <div>
          <TaskForm
            task={editTask}
            onClose={() => {
              setShowForm(false);
              setEditTask(null);
            }}
            onSubmit={editTask ? handleUpdate : handleAdd}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
