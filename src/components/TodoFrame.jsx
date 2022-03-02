import React, { useState } from "react";
import EmptyTaskReminder from "./ErrorField/EmptyTaskReminder";
import TodoFotter from "./TodoFotter";
import TodoInput from "./TodoInput";
import TodoTask from "./TodoTask";

const TodoFrame = () => {

    const [task, setTask] = useState([]);
    const [remindTask, setRemindTask] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [showActive, setShowActive] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);

    const onTextChange = (e) => {
        remindTask && setRemindTask(false);
        setTaskText(e.target.value);
    }

    const addTask = () => {
        if (taskText.replace(/ /g, '')) {
            const newTask = { id: Number(new Date()), text: taskText, isDone: false, editMode: false }
            const newTaskArray = [...task];
            newTaskArray.push(newTask);
            setTask(newTaskArray);
            setTaskText('');
        }
        else {
            setTaskText('');
            setRemindTask(true);
        }
    }

    const changeTask = (id, newText) => {
        if (newText.replace(/ /g, '')) {
            const newTaskArray = [...task];
            newTaskArray.map(el => {
                if (el.id === id) {
                    el.text = newText
                }
            })
            setTask(newTaskArray);
            setTaskText('');
        }
        else setRemindTask(true);
    }

    const selectAllTasks = () => {
        const newTaskArray = task.map(el => {
            if (!el.isDone) {
                el.isDone = !el.isDone;
                return el;
            }
            else return el;
        }
        );
        setTask(newTaskArray);
    }

    const changeTaskStatus = (id) => {
        remindTask && setRemindTask(false);
        const newTaskArray = task.map(el => {
            if (el.id == id) el.isDone = !el.isDone
            return el
        })
        setTask(newTaskArray)
    }

    const changeEditMode = (id) => {
        remindTask && setRemindTask(false);
        const newTaskArray = task.map(el => {
            if (el.id == id) el.editMode = !el.editMode
            return el
        })
        setTask(newTaskArray)
    }

    const clearCompleted = () => {
        remindTask && setRemindTask(false);
        const newTaskArray = task.filter(el => !el.isDone);
        setTask(newTaskArray);
    }

    const deleteSingleTask = (id) => {
        remindTask && setRemindTask(false);
        const newTaskArray = task.filter(el => el.id !== id);
        setTask(newTaskArray);
    }

    const onAllShowing = () => {
        setShowAll(true);
        setShowActive(false);
        setShowCompleted(false);

    }
    const onActiveShowing = () => {
        setShowAll(false);
        setShowActive(true);
        setShowCompleted(false);
    }
    const onCompletedShowing = () => {
        setShowAll(false);
        setShowActive(false);
        setShowCompleted(true);
    }

    return (
        <div className='container py-4 align-items-start col mt-5 '>
            {remindTask && <EmptyTaskReminder />}
            <h1 className="todos">todos</h1>
            <TodoInput itemsLength={task.length} selectAllTasks={selectAllTasks} addTask={addTask} onTextChange={onTextChange}
                isAllDone={task.filter(el => el.isDone).length === task.length} taskText={taskText} />
            <ul className="list-group pt-0">
                <TodoTask task={task} changeTask={changeTask} taskText={taskText} changeEditMode={changeEditMode}
                    changeTaskStatus={changeTaskStatus} showAll={showAll} showActive={showActive} showCompleted={showCompleted} deleteSingleTask={deleteSingleTask} />
            </ul>
            {task.length > 0 && <TodoFotter showAll={showAll} showActive={showActive} showCompleted={showCompleted} itemsLength={task.length}
                activeLength={task.filter(el => !el.isDone).length} completedLength={task.filter(el => el.isDone).length} key={task.filter(el => !el.isDone).length}
                onAllShowing={onAllShowing} onActiveShowing={onActiveShowing} onCompletedShowing={onCompletedShowing} clearCompleted={clearCompleted} />}
        </div>
    )
}

export default TodoFrame;