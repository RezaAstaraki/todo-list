import React, { useState,useEffect } from 'react';
import Task from './Task';
import './TaskManager.css';

export function formatDateTime(date,secondType) {
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

function TaskManager() {
    
  const [taskItems, setTaskItem] = useState([]);

  useEffect(() => {
    console.log('rendering TaskManager element ')
    // console.log(taskItems)
  })
 
  const addNewTask = () => {
    const runTime = new Date();
    const initiateNewTaskData = {
        id: Date.now(),
        addedDate:formatDateTime(runTime),
        startDate:formatDateTime(runTime,true),
    }
    
    setTaskItem([...taskItems, initiateNewTaskData]);
  };


  
  const handleRemoveTask = (taskID) => {
    const updateTaskItems =taskItems.filter((task)=>task.id !==taskID)
    setTaskItem(updateTaskItems)
  }
  const [sortType, setSortType] = useState(1)
  const handleSort = ([by]) => {

    const sortedTaskItems = [...taskItems]
    sortedTaskItems.sort((a, z) => a.by  < z.by ? sortType: -sortType) 

    
    setSortType(preSortType => -1 * preSortType)
    setTaskItem(sortedTaskItems)
    
    

  }

  return (
    <>
      <ul>   
       
        {taskItems.map(item => <li key={item.id}>
                                  <span>id: {item.id} </span>
                                  <span>added: {item.addedDate} </span>
                                  <span>started : {item.startDate} </span>
                                  <span> </span>
                                </li>)}
        
      </ul>
    <table>
      <thead>
        <tr className="header-row">
          <th style={{ cursor: 'pointer' }}
              onClick={() => handleSort('addedDate')}>description</th>
          <th style={{ cursor: 'pointer' }}
            onClick={()=>handleSort('description')}>Added Date</th>
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
        {taskItems.map((task) => (
          <tr key={task.id}>
            <Task initiateNewTaskData={task} handleRemoveTask={handleRemoveTask}/>
          </tr>
        ))}
      </tbody>
      </table>
      </>
  );
}

export default TaskManager;
