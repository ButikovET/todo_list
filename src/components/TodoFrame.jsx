import React, { useEffect, useState } from "react";
import TodoFooter from "./TodoFooter";
import TodoInput from "./TodoInput";
import TodoTaskList from "./TodoTaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addTaskThunk,
  deleteAllCheckedTasksThunk,
  deleteTaskThunk,
  getAllTasksThunk,
  selectAllTasksThunk,
  updateTaskThunk,
} from "../redux/todoItemsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TodoFrame = () => {

  const allTasks = useSelector(state => state.todoItemsReducer.todoItems);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, []);

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
    dispatch(updateTaskThunk(id, isChangeBoolean ? { isDone: change } : { text: change }));
  };

  const selectAllTasks = () => {
    dispatch(selectAllTasksThunk(activeLength ? true : false));
  };

  const clearCompleted = () => {
    dispatch(deleteAllCheckedTasksThunk());
  };

  const deleteSingleTask = (id) => {
    dispatch(deleteTaskThunk(id))
  };

  return (
    <div className="container py-4 align-items-start col mt-5 ">
      <ToastContainer />
      <h1 className="todos">todos</h1>
      <TodoInput
        itemsLength={allTasks.length}
        selectAllTasks={selectAllTasks}
        addTask={addTask}
        onTextChange={onTextChange}
        isAllDone={completedLength === allTasks.length}
        taskText={taskText}
      />
      <TodoTaskList
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
    </div>
  );
};

export default TodoFrame;
