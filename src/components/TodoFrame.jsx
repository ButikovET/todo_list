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
  const allTasks = useSelector((state) => state.todoSlice.todoItems || []);
  const name = useSelector((state) => state.todoSlice.name || "");
  const totalPages = useSelector((state) => state.todoSlice.totalPages || 1);
  const currentPage = useSelector((state) => state.todoSlice.currentPage || 1);
  const todosInOnePage = useSelector(
    (state) => state.todoSlice.todosInOnePage || 5
  );

  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getAllTasksThunk({ pageNum: currentPage, todosInOnePage }));
  }, [name]);

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
    dispatch(
      selectAllTasksThunk({
        isDone: activeLength ? true : false,
        currentPage,
        tasks_id: allTasks.map((el) => el._id),
      })
    );
  };

  const clearCompleted = async () => {
    const tasks_id = allTasks.filter((el) => el.isDone).map((el) => el._id);
    await dispatch(deleteAllCheckedTasksThunk(tasks_id));
    if (tasks_id.length === allTasks.length)
      dispatch(getAllTasksThunk({ pageNum: 1, todosInOnePage }));
  };

  const deleteSingleTask = async (id) => {
    await dispatch(deleteTaskThunk(id));
    if (allTasks.length === 1)
      dispatch(getAllTasksThunk({ pageNum: 1, todosInOnePage }));
  };
  const logOut = () => {
    dispatch(logOutUserThunk());
  };

  const onPageChange = (e) => {
    dispatch(
      getAllTasksThunk({
        pageNum: Number(e.target.innerText),
        todosInOnePage: Number(todosInOnePage),
      })
    );
  };

  const onTodoInOnePageChanged = (e) => {
    dispatch(
      getAllTasksThunk({
        pageNum: Number(currentPage),
        todosInOnePage: Number(e.target.value),
      })
    );
  };

  return (
    <div className="container py-4 align-items-start col mt-5 ">
      <div
        className="position-absolute top-0 end-0 m-3 p-3 mb-5 bg-body rounded logButton"
        onClick={logOut}
      >
        Log Out
      </div>
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
          onPageChange={onPageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          todosInOnePage={todosInOnePage}
          onTodoInOnePageChanged={onTodoInOnePageChanged}
        />
      )}
      {name && (
        <span className="position-fixed bottom-0 end-0 m-4 text-muted translate-middle-x">
          @{name}
        </span>
      )}
    </div>
  );
};

export default TodoFrame;
