import React, { useState } from "react";
import EmptyTaskReminder from "./ErrorField/EmptyTaskReminder";
import TodoFotter from "./TodoFotter";
import TodoInput from "./TodoInput";
import TodoTaskList from "./TodoTaskList";

const TodoFrame = () => {
  const [task, setTask] = useState([]);
  const [remindTask, setRemindTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("");

  const activeLength = task.filter((el) => !el.isDone).length;
  const completedLength = task.length - activeLength;

  const onTextChange = (e) => {
    remindTask && setRemindTask(false);
    setTaskText(e.target.value);
  };

  const addTask = () => {
    if (taskText.trim()) {
      const newTask = { id: Number(new Date()), text: taskText, isDone: false };
      const newTaskArray = [...task, newTask];
      setTask(newTaskArray);
    } else setRemindTask(true);
    setTaskText("");
  };

  const changeTask = (id, newText) => {
    if (newText.trim()) {
      const newTaskArray = [...task];
      newTaskArray.map((el) => {
        if (el.id === id) el.text = newText;
      });
      setTask(newTaskArray);
      setTaskText("");
    } else setRemindTask(true);
  };

  const selectAllTasks = () => {
    const newTaskArray = task.map((el) => {
      if (activeLength) return { ...el, isDone: true };
      else return { ...el, isDone: false };
    });
    setTask(newTaskArray);
  };

  const changeTaskStatus = (id) => {
    remindTask && setRemindTask(false);
    const newTaskArray = task.map((el) => {
      if (el.id === id) return { ...el, isDone: !el.isDone };
      return el;
    });
    setTask(newTaskArray);
  };

  const clearCompleted = () => {
    remindTask && setRemindTask(false);
    const newTaskArray = task.filter((el) => !el.isDone);
    setTask(newTaskArray);
  };

  const deleteSingleTask = (id) => {
    remindTask && setRemindTask(false);
    const newTaskArray = task.filter((el) => el.id !== id);
    setTask(newTaskArray);
  };

  return (
    <div className="container py-4 align-items-start col mt-5 ">
      {remindTask && <EmptyTaskReminder />}
      <h1 className="todos">todos</h1>
      <TodoInput
        itemsLength={task.length}
        selectAllTasks={selectAllTasks}
        addTask={addTask}
        onTextChange={onTextChange}
        isAllDone={completedLength === task.length}
        taskText={taskText}
      />
      <TodoTaskList
        task={task}
        remindTask={remindTask}
        changeTask={changeTask}
        setRemindTask={setRemindTask}
        changeTaskStatus={changeTaskStatus}
        deleteSingleTask={deleteSingleTask}
        filter={filter}
      />
      {!!task.length && (
        <TodoFotter
          filter={filter}
          setFilter={setFilter}
          itemsLength={task.length}
          activeLength={activeLength}
          completedLength={completedLength}
          key={task.length}
          clearCompleted={clearCompleted}
        />
      )}
    </div>
  );
};

export default TodoFrame;
