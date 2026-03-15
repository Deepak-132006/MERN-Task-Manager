import React, { useState } from "react";
import Delete from "../assets/cancel2.png";
import Completed from "../assets/circle.png";
import Edit from "../assets/edit-text3.png";
import Incompleted from "../assets/unchecked.png";

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  if (!task) return null;

  const isCompleted = task.status === "completed";
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = () => {
    setDeleting(true);
    setTimeout(()=> {
      onDelete();
    }, 800)
  }

  return (
    <div className={`flex items-start gap-4 w-full h-fit justify-between max-w-[700px] bg-[#e7e7e7] px-6 py-4 rounded hover:-translate-y-2 duration-200 ${deleting ? "animate-[fallDown_0.6s_ease-in_forwards]" : ""}`}>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h3
          className={`md:text-[22px] ${isCompleted ? "line-through text-gray-400" : ""}`}
        >
          {task.title}
        </h3>

        {task.description && (
          <div>
            <p className="text-sm break-words text-[#aaaaaa]">
              {task.description}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center mt-3 gap-6 shrink-0">
        <button
          title={isCompleted ? "Mark incomplete" : "Mark complete"}
          onClick={onToggle}
        >
          <img
            className="w-8 md:w-10 cursor-pointer hover:scale-110 transition"
            src={isCompleted ? Completed : Incompleted}
            alt={isCompleted ? "Completed" : "Incomplete"}
          />
        </button>

        <button title="Edit" onClick={onEdit}>
          <img
            className="w-8 md:w-10 cursor-pointer
          hover:scale-110 transition"
            src={Edit}
            alt="Edit"
          />
        </button>

        <button title="Delete" onClick={handleDeleteClick}>
          <img
            className="w-6 md:w-8 cursor-pointer hover:scale-110 transition"
            src={Delete}
            alt="Delete"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
