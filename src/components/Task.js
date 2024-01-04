import React,{useEffect, useState} from 'react'
import './Task.css'


export default function Task({ initiateNewTaskData,taskDataChangeHandler,handleRemoveTask }) {
    
    const [task, setTask] = useState({
        id: initiateNewTaskData.id,
        description: '',
        addedDate: initiateNewTaskData.addedDate,
        startDate: initiateNewTaskData.startDate,
        deadLineDate: '',
        remainingTime: '',
        completion: 0,
        editMode: true,

    })

    
    useEffect(() => {
        console.log('rendering Task element ')
    })

    // calculateRemainingTime
const calculateRemainingTime = () => {
    const intervalCalcTime = setInterval(() => {
        setTask(prev => {
            console.log('deadLineDate = ', prev.deadLineDate);
            let result = '';

            if (prev.deadLineDate === '') {
                result = 'no deadline defined ';
            } else {
                const now = Date.now();
                const differenceInSeconds = (new Date(prev.deadLineDate) - now) / 3000;

                if (differenceInSeconds < 0) {
                    result = 'deadline has passed';
                } else {
                    const days = Math.floor(differenceInSeconds / (24 * 60 * 60));
                    const hours = Math.floor((differenceInSeconds % (60 * 60 * 24)) / (60 * 60));
                    const minutes = Math.floor((differenceInSeconds % (60 * 60)) / 60);
                    result = `${days} days ${hours} hours ${minutes} minutes`;
                }
            }

            console.log('interval is running', 'state is', result);
            return { ...prev, remainingTime: result };
            });
        }, 1000);
    };

    useEffect(() => {
            calculateRemainingTime()
    }, [])
    

    const handleInput = (e,inputFieldName)=>{
        setTask(prevTask=>({
            ...prevTask,[inputFieldName]: e.target.value})) 
        console.log('after update = ',task)          
    }

    const okButtonHandler = () => { 
        setTask({ ...task, editMode: false }) 
    }

    useEffect(() => {
        taskDataChangeHandler(task)
    },[task] )
    

  return (
    <>
        <td>
            <input 
                disabled={!task.editMode} 
                value={task.description} 
                type='textarea'
                onChange={e=>handleInput(e,'description')} />
        </td>
        <td>{task.addedDate}</td>
        <td>
            <input 
                disabled={!task.editMode} 
                type='datetime-local' 
                value={task.startDate}
                onChange={e=>handleInput(e,'startDate')}/>
        </td>
        <td>
            <input 
                disabled={!task.editMode} 
                type='datetime-local' 
                value={task.deadLineDate}
                onChange={e=>handleInput(e,'deadLineDate')}/>
        </td>
        <td>
        
                {task.remainingTime} 
        </td>
        <td>
            <input 
                disabled={!task.editMode} 
                type='number' 
                value={task.completion}
                onChange={e=>handleInput(e,'completion')}/>   
        </td>
        <td>
            <button 
                type='button'
                onClick={()=>setTask({...task,editMode:true})}>
                    editMode
            </button>
            <button type='button' onClick={()=>okButtonHandler(task.id)}>ok</button>
              <button className='close' type='button'
                  onClick={() => handleRemoveTask(task.id)}>X</button>
        </td>
        
    </>
  )
}
