import React, { useState } from "react";
import Delete from "../assets/cancel.png";
import Completed from "../assets/circle.png";
import Edit from "../assets/edit-text.png";
import Incompleted from "../assets/unchecked.png";

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  if (!task) return null;
  const isCompleted = task.status === "completed";
  

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex items-center gap-5">
        <h3>{task.title}</h3>
        <button onClick={onToggle}>
          <img
            className={isCompleted ? "w-15" : "w-15"}
            src={isCompleted ? Completed : Incompleted}
            alt="status"
          />
        </button>
      </div>
      {task.description && (
        <div>
          <p className="task-des" id="para">
            {task.description}
          </p>
          <button id="btn" onClick={toggleText}>
            Read more
          </button>
        </div>
      )}
      <div>
        <button title="Edit" onClick={onEdit}>
          <img className="w-15" src={Edit} alt="Edit" />
        </button>
      </div>
      <div>
        <button title="Delete" onClick={onDelete}>
          <img className="w-15" src={Delete} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
