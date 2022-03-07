import React, { useEffect, useState } from "react";
import { tasksAPI } from "../api/axiosAPI";
import TodoFooter from "./TodoFooter";
import TodoInput from "./TodoInput";
import TodoTaskList from "./TodoTaskList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTaskThunk, deleteAllCheckedTasksThunk, deleteTaskThunk, getAllTasksThunk, selectAllTasksThunk, updateTaskThunk } from "../redux/todoItemsReducer";
import { connect } from "react-redux";

const TodoFrame = (props) => {

  console.log(props)

  const [task, setTask] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    try {
      toast.promise(tasksAPI.getAllTasks()
      .then((response) => setTask(response.data)))
      .catch((error) => toast.error('Can not add new task, server error: ' + error));
    } catch (error) {}
  }, []);

  const activeLength = task.filter((el) => !el.isDone).length;
  const completedLength = task.length - activeLength;

  const onTextChange = (e) => {
    setTaskText(e.target.value);
  };

  const addTask = async () => {
    if (taskText.trim()) {
      try {
        const resposne = await tasksAPI.addTask({ text: taskText });
        toast.success('New task added');
        const newTaskArray = [...task, resposne.data];
        setTask(newTaskArray);
      } catch (error) {
        toast.error('Can not add new task, server error: ' + error);
      }
    } else toast.warn('Please add some text in new task, spaces will be cutted');
    setTaskText("");
  };

  const changeTask = async (id, change) => {
    const isCahngedBoolean = typeof(change)==='boolean';
    try {
      await tasksAPI.updateTask(id, isCahngedBoolean?{isDone:change}:{text:change});
      const newTaskArray = task.map((el) => {
        if (el._id === id) isCahngedBoolean?el.isDone=!el.isDone:el.text=change;
        return el;
      });
      setTask(newTaskArray);
      setTaskText("");
      toast.success('Task successfully changed');
    } catch (error) {
      toast.error('Can not add new task, server error: ' + error);
    }
  };

  const selectAllTasks = async () => {
    let isSomethingActive;
    const newTaskArray = task.map((el) => {
      if (activeLength) {
        isSomethingActive = true;
      } else {
        isSomethingActive = false;
      }
      return { ...el, isDone: isSomethingActive };
    });
    try {
      await tasksAPI.updateAllIsDone({ isDone: isSomethingActive });
      setTask(newTaskArray);
    } catch (error) {
      toast.error('Can not add new task, server error: ' + error);
    }
  };


  const clearCompleted = async () => {
    try {
      await tasksAPI.deleteAllDoneTasks();
      toast.success('All completed tasks have been deleted');
      const newTaskArray = task.filter((el) => !el.isDone);
      setTask(newTaskArray);
    } catch (error) {
      toast.error('Can not add new task, server error: ' + error);
    }
  };

  const deleteSingleTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      toast.success('Task has been deleted');
      const newTaskArray = task.filter((el) => el._id !== id);
      setTask(newTaskArray);
    } catch (error) {
      toast.error('Can not add new task, server error: ' + error);
    }
  };

  return (
    <div className="container py-4 align-items-start col mt-5 ">
      <ToastContainer />
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
        changeTask={changeTask}
        deleteSingleTask={deleteSingleTask}
        filter={filter}
        toast={toast}
      />
      {!!task.length && (
        <TodoFooter
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

const mapStateToProps = (state) =>{
  return {
    allTasks: state.todoItemsReducer.todoItems
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getAllTasks(){
      dispatch(getAllTasksThunk());
    },
    addTask(text){
      dispatch(addTaskThunk(text));
    },
    updateTask(id, change, isChangeBoolean){
      dispatch(updateTaskThunk(id, change, isChangeBoolean));
    },
    deleteTask(id){
      dispatch(deleteTaskThunk(id));
    },
    selectAllTasksThunk(isChecked){
      dispatch(selectAllTasksThunk(isChecked));
    },
    deleteAllDoneTasks(){
      dispatch(deleteAllCheckedTasksThunk());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoFrame);
