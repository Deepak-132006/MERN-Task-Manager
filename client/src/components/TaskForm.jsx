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
        
      })
    }
  })

  return (
    <div>

    </div>
  )
}

export default TaskForm