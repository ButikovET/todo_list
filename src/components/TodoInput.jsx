import React from "react";
import classes from './TodoInput.module.css';

const TodoInput = ({addTask, onTextChange, taskText, selectAllTasks, isAllDone}) => {
    return (
        <form className="input-group shadow-sm bg-body rounded-0 h-100" onSubmit={(e)=>{e.preventDefault(); addTask()}}>
            <span className={isAllDone==0?classes.down_arrow+" "+classes.color_gray:classes.down_arrow} id="basic-addon1" onClick={selectAllTasks}>&#8964;</span>
            <input value={taskText} type="text" className="input_area h-100 p-3" placeholder="What needs to be done?" aria-label="Username" aria-describedby="basic-addon1" onChange={onTextChange}/>
        </form>
    )
}

export default TodoInput;