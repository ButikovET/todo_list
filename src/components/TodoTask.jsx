import React, { useState } from "react";

const TodoTask = ({ task, changeTaskStatus, showAll, showActive, showCompleted, deleteSingleTask, changeEditMode, changeTask }) => {

    const [newText, setNewText] = useState('')

    return task.map(el => {
        if (showActive && !el.isDone) return (
            <li className="d-flex list-group-item position-relative pointer rounded-0 task align-items-center p-3 todoTask" key={el.id} onDoubleClick={() => { changeEditMode(el.id); setNewText(el.text) }}>
                <input className="form-check-input me-3 checkbox " type="checkbox" value="" checked={el.isDone} aria-label="..." onChange={() => { changeTaskStatus(el.id); }} />
                {el.editMode
                    ? <input className="w-75" type={'text'} autoFocus={"true"} value={newText} onKeyPress={(e) => {if (e.key === 'Enter'){changeTask(el.id, newText); changeEditMode(el.id)}}} onBlur={() => {changeTask(el.id, newText); changeEditMode(el.id) }} onChange={(e)=>{setNewText(e.target.value)}} />
                    : el.isDone
                        ? <del>{el.text}</del>
                        : el.text}
                <button type="button" className="btn-close position-absolute top-50 end-0 translate-middle-y delete_button" aria-label="Close" onClick={() => { deleteSingleTask(el.id) }} />
            </li>
        )
        else if (showCompleted && el.isDone) return (
            <li className="d-flex list-group-item position-relative pointer rounded-0 task align-items-center p-3 todoTask" key={el.id} onDoubleClick={() => { changeEditMode(el.id); setNewText(el.text) }}>
                <input className="form-check-input me-3 checkbox " type="checkbox" value="" checked={el.isDone} aria-label="..." onChange={() => { changeTaskStatus(el.id); }} />
                <button type="button" className="btn-close position-absolute top-50 end-0 translate-middle-y delete_button" aria-label="Close" onClick={() => { deleteSingleTask(el.id) }} />
                {el.editMode
                    ? <input className="w-75" type={'text'} autoFocus={"true"} value={newText} onKeyPress={(e) => {if (e.key === 'Enter'){changeTask(el.id, newText); changeEditMode(el.id)}}} onBlur={() => {changeTask(el.id, newText); changeEditMode(el.id) }} onChange={(e)=>{setNewText(e.target.value)}} />
                    : el.isDone
                        ? <del>{el.text}</del>
                        : el.text}
            </li>
        )
        else if (showAll) return (
            <li className="d-flex list-group-item position-relative pointer rounded-0 task align-items-center p-3 todoTask" key={el.id} onDoubleClick={() => { changeEditMode(el.id); setNewText(el.text) }}>
                <input className="form-check-input me-3 checkbox " type="checkbox" value="" checked={el.isDone} aria-label="..." onChange={() => { changeTaskStatus(el.id); }} />
                <button type="button" className="btn-close position-absolute top-50 end-0 translate-middle-y delete_button" aria-label="Close" onClick={() => { deleteSingleTask(el.id) }} />
                {el.editMode
                    ? <input className="w-75" type={'text'} autoFocus={"true"} value={newText} onKeyPress={(e) => {if (e.key === 'Enter'){changeTask(el.id, newText); changeEditMode(el.id)}}} onBlur={() => {changeTask(el.id, newText); changeEditMode(el.id) }} onChange={(e)=>{setNewText(e.target.value)}}/>
                    : el.isDone
                        ? <del>{el.text}</del>
                        : el.text}
            </li>
        )

    })
}

export default TodoTask;