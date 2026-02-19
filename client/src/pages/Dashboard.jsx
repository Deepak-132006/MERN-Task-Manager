import React from "react";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
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
