import React,{useEffect, useState} from 'react'
import './Task.css'

export default function Task({ initiateNewTaskData,handleRemoveTask }) {
    
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
        let remainingTimeStatus = ''
        if (task.deadLineDate === '') {
            remainingTimeStatus='no deadline defined '
        } else {
            remainingTimeStatus='will calculate'
        }
        console.log(remainingTimeStatus)
        return remainingTimeStatus
        }

    useEffect(() => {

        setTask({ ...task,remainingTime : calculateRemainingTime()})
    
    }, [task.deadLineDate])
    

    const handleInput = (e,inputFieldName)=>{
        const updatedTask = {...task,[inputFieldName]: e.target.value}
        // console.log({[inputFieldName]: e.target.value});
        setTask(updatedTask)           
    }

    const okButtonHandler = () => {
        console.log(task.deadLineDate)   
        setTask({ ...task, editMode: false })

        
        
    }


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
        <td>{task.completion}</td>
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
