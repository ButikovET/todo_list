import React, { useEffect, useState } from "react";
import { tasksAPI } from "../api/axiosAPI";
import EmptyTaskReminder from "./ErrorField/EmptyTaskReminder";
import TodoFotter from "./TodoFotter";
import TodoInput from "./TodoInput";
import TodoTaskList from "./TodoTaskList";

const TodoFrame = () => {
  const [task, setTask] = useState([]);
  const [remindTask, setRemindTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    try {
      tasksAPI.getAllTasks().then((responce) => setTask(responce.data));
    } catch (error) {}
  }, []);

  const activeLength = task.filter((el) => !el.isDone).length;
  const completedLength = task.length - activeLength;

  const onTextChange = (e) => {
    remindTask && setRemindTask(false);
    setTaskText(e.target.value);
  };

  const addTask = async () => {
    if (taskText.trim()) {
      try {
        const respocne = await tasksAPI.addTask({ text: taskText });
        const newTaskArray = [...task, respocne.data];
        setTask(newTaskArray);
      } catch (error) {}
    } else setRemindTask(true);
    setTaskText("");
  };

  const changeTask = async (element) => {
    try {
      await tasksAPI.updateTask(element._id, element);
      const newTaskArray = task.map((el) => {
        if (el._id === element._id) return element;
        else return el;
      });
      setTask(newTaskArray);
      setTaskText("");
    } catch (error) {}
  };

  const selectAllTasks = async () => {
    let isSomethingActive;
    const newTaskArray = task.map((el) => {
      if (activeLength) {
        isSomethingActive = true;
        return { ...el, isDone: true };
      } else {
        isSomethingActive = false;
        return { ...el, isDone: false };
      }
    });
    try {
      await tasksAPI.updateAllIsDone({ isDone: isSomethingActive });

      setTask(newTaskArray);
    } catch (error) {}
  };

  const changeTaskStatus = async (id) => {
    remindTask && setRemindTask(false);
    let isDone = false;
    const newTaskArray = [...task];
    newTaskArray.map(async (el) => {
      if (el._id === id) isDone = el.isDone = !el.isDone;
    });
    try {
      await tasksAPI.updateTask(id, { isDone });
      setTask(newTaskArray);
    } catch (error) {}
  };

  const clearCompleted = async () => {
    remindTask && setRemindTask(false);
    try {
      await tasksAPI.deleteAllDoneTasks();
      const newTaskArray = task.filter((el) => !el.isDone);
      setTask(newTaskArray);
    } catch (error) {}
  };

  const deleteSingleTask = async (id) => {
    remindTask && setRemindTask(false);
    console.log(id);
    try {
      await tasksAPI.deleteTask(id);
      const newTaskArray = task.filter((el) => el._id !== id);
      setTask(newTaskArray);
    } catch (error) {}
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
