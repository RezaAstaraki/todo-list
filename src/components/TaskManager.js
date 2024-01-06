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



  const taskDataChangeHandler = (newData) => {
    setTaskItem(prevTaskItems=>prevTaskItems.map(task=>task.id===newData.id?newData:task))
    
  }


  
  const handleRemoveTask = (taskID) => {
    const updateTaskItems =taskItems.filter((task)=>task.id !==taskID)
    setTaskItem(updateTaskItems)
  }

  const [sortType, setSortType] = useState(1)
const handleSort = (sortBy) => {
    setSortType((prevSortType) => -prevSortType);

    const sortedTaskItems = [...taskItems].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortType * valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortType * (valueA - valueB);
        }

        if (valueA instanceof Date && valueB instanceof Date) {
            return sortType * (valueA - valueB);
        }

        // Handle other data types if needed

        return 0;
    });

    setTaskItem(sortedTaskItems);
};


















  return (
    <>
      <ul>   
        
       
        {taskItems.map(item => <li key={item.id}>
                                  <span>description: {item.description} </span>
                                  <span>id: {item.id} </span>
                                  <span>added: {item.addedDate} </span>
                                  <span>started : {item.startDate} </span>
                                  <span>deadLineDate : {item.deadLineDate} </span>
                                  <span>remaining Time : {item.remainingTime} </span>
                                  <span>completion : {item.completion} </span>
                                  <span> </span>
                                </li>)}
        
      </ul>
    <table>
      <thead>
        <tr className="header-row">
          <th style={{ cursor: 'pointer',userSelect:'none' }}
              onClick={() => handleSort('description')}>description</th>
          <th style={{ cursor: 'pointer', userSelect:'none' }}
            onClick={()=>handleSort('addedDate')}>Added Date</th>
          <th style={{ cursor: 'pointer', userSelect:'none' }}
            onClick={()=>handleSort('startDate')}>start date</th>
          <th style={{ cursor: 'pointer', userSelect:'none' }}
            onClick={()=>handleSort('deadLineDate')}>deadLineDate</th>
          <th style={{ cursor: 'pointer', userSelect:'none' }}
            onClick={()=>handleSort('remainingTime')}>remaining Time</th>
          <th style={{ cursor: 'pointer', userSelect:'none' }}
            onClick={()=>handleSort('completion')}>completion</th>
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
            <Task initiateNewTaskData={task}
              taskDataChangeHandler={taskDataChangeHandler}
              handleRemoveTask={handleRemoveTask} />
          </tr>
        ))}
      </tbody>
      </table>
      </>
  );
}

export default TaskManager;
