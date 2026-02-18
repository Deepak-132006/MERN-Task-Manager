import React, { useState } from "react";
import Delete from "../assets/cancel.png";
import Completed from "../assets/circle.png";
import Edit from "../assets/edit-text.png";
import Incompleted from "../assets/unchecked.png";

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  if(!task) return null;
  const isCompleted = task.status === "completed";

  return (
    <div>
      <div>
        <h3>{task.title}</h3>
        <button>
          <img src={isCompleted ? Completed : Incompleted} alt="status"/>
        </button>
      </div>
      {task.description && <p>{task.description}</p>}
      <div>
        <button title="Edit" onClick={onEdit}>
          <img src={Edit} alt="Edit" />
        </button>
      </div>
      <div>
        <button title="Delete" onClick={onDelete}>
          <img src={Delete} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
