import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'



const TaskForm = ({task, onSubmit, onClose}) => {
  const isEdit = !!task;
  const [form, setForm] = useState({
    title:"",
    description:"",
    dueDate:"",
  })

  useEffect(() => {
    if(isEdit){
      setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      })
    }
  }, [isEdit, task])

  return (
    <div>

    </div>
  )
}

export default TaskForm