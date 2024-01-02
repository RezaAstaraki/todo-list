import React, { useState } from 'react';
import Task from './Task';
import './TaskManager.css';

function TaskManager() {

    function formatDateTime(date,secondType) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        if(secondType){
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
  const [taskItems, setTaskItem] = useState([]);
 
  const addNewTask = () => {
    const runTime = new Date();
    const newTaskData = {
 
        id: Date.now(),
        description:'hello',
        addedDate:formatDateTime(runTime),
        startDate:formatDateTime(runTime,true),
    }
    const newTask = <Task 
                        inputDate={newTaskData} 
                        key={taskItems.length} />;

    setTaskItem([...taskItems, newTask]);
  };

  return (
    <table>
      <thead>
        <tr className="header-row">
          <th>description</th>
          <th>Added Date</th>
          <th>started date</th>
          <th>deadLineDate</th>
          <th>remaining Time</th>
          <th>completion</th>
          <th>
            <button className="" onClick={addNewTask}>
              add
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {taskItems.map((task, index) => (
          <tr key={index}>{task}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskManager;
