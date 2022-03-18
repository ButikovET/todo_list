import React, { useEffect, useState } from "react";
import TodoFooter from "./TodoFooter";
import TodoInput from "./TodoInput";
import TodoTaskList from "./TodoTaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTasksThunk,
  addTaskThunk,
  deleteAllCheckedTasksThunk,
  deleteTaskThunk,
  logOutUserThunk,
  selectAllTasksThunk,
  updateTaskThunk,
} from "../redux/todoSlice";

const TodoFrame = () => {
  const allTasks = useSelector((state) => state.todoSlice.todoItems||[]);
  const name = useSelector((state) => state.todoSlice.name||'');
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(()=>{
    dispatch(getAllTasksThunk())
  },[name]);

  const activeLength = allTasks.filter((el) => !el.isDone).length;
  const completedLength = allTasks.length - activeLength;

  const onTextChange = (e) => {
    setTaskText(e.target.value);
  };

  const addTask = () => {
    taskText.trim()
      ? dispatch(addTaskThunk(taskText))
      : toast.warn("Please add some text in new task, spaces will be cutted");
    setTaskText("");
  };

  const changeTask = (id, change) => {
    const isChangeBoolean = typeof change === "boolean";
    dispatch(
      updateTaskThunk({
        id: id,
        changes: isChangeBoolean ? { isDone: change } : { text: change },
      })
    );
  };

  const selectAllTasks = () => {
    dispatch(selectAllTasksThunk(activeLength ? true : false));
  };

  const clearCompleted = () => {
    dispatch(deleteAllCheckedTasksThunk());
  };

  const deleteSingleTask = (id) => {
    dispatch(deleteTaskThunk(id));
  };
  const logOut = () =>{
    dispatch(logOutUserThunk());
  }

  return (
    <div className="container py-4 align-items-start col mt-5 ">
      <div className="position-absolute top-0 end-0 m-3 p-3 mb-5 bg-body rounded logButton" onClick={logOut}>Log Out</div>
      <ToastContainer />
      <h1 className="todos">todos</h1>
      <TodoInput
        itemsLength={allTasks.length}
        selectAllTasks={selectAllTasks}
        addTask={addTask}
        onTextChange={onTextChange}
        completedLength={completedLength}
        taskText={taskText}
      />
      <TodoTaskList
        allTasks={allTasks}
        changeTask={changeTask}
        deleteSingleTask={deleteSingleTask}
        filter={filter}
        toast={toast}
      />
      {!!allTasks.length && (
        <TodoFooter
          filter={filter}
          setFilter={setFilter}
          itemsLength={allTasks.length}
          activeLength={activeLength}
          completedLength={completedLength}
          key={allTasks.length}
          clearCompleted={clearCompleted}
        />
      )}
      {name&&<span className="position-absolute bottom-0 end-0 p-3 text-muted">@{name}</span>}
    </div>
  );
};

export default TodoFrame;
