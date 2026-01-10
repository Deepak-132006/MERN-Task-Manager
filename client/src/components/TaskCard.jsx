import { CheckCircle, Edit, Trash2, Circle } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const isCompleted = task.status === "completed";
  return (
    <div>
      <div>
        <h3>{task.title}</h3>
        <button>
          {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
      </div>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && (
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <div>
        <button onClick={onEdit} title="Edit"><Edit size={18}/></button>
        <button onClick={onDelete} title="Delete"><Trash2 size={18}/></button>
      </div> 
    </div>
  );
}


export default TaskCard