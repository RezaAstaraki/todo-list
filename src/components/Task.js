import React,{useState} from 'react'
import './Task.css'

export default function Task({inputDate}) {
    const [Task, setTask] = useState({
        id:'',
        description:inputDate.description,
        addedDate:inputDate.addedDate,
        startDate:inputDate.startDate,
        deadLineDate:'',
        remainingTime:'',
        completion:0,
        editMode:true,

    })
   

    const handleInput = (e,taskKey)=>{
        const updatedTask = {...Task,[taskKey]: e.target.value}
        console.log({[taskKey]: e.target.value});
        setTask(updatedTask)
            
    }

  return (
    <>
        <td>
            <input 
                disabled={!Task.editMode} 
                value={Task.description} 
                type='textarea'
                onChange={e=>handleInput(e,'description')} />
        </td>
        <td>{Task.addedDate}</td>
        <td>
            <input 
                disabled={!Task.editMode} 
                type='datetime-local' 
                value={Task.startDate}
                onChange={e=>handleInput(e,'startDate')}/>
        </td>
        <td>
            <input 
                disabled={!Task.editMode} 
                type='datetime-local' 
                value={Task.deadLineDate}
                onChange={e=>handleInput(e,'deadLineDate')}/>
        </td>
        <td></td>
        <td>{Task.completion}</td>
        <td>
            <button 
                type='button'
                onClick={()=>setTask({...Task,editMode:true})}>
                    editMode
            </button>
            <button type='button' onClick={()=>setTask({...Task,editMode:false})}>ok</button>
            <button className='close' type='button' onClick={()=>null}>X</button>
        </td>
        
    </>
  )
}
