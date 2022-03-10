import React from "react";
import TodoTask from "./TodoTask";

const TodoTaskList = ({
  allTasks,
  changeTask,
  changeTaskStatus,
  deleteSingleTask,
  filter,
  toast
}) => {
  return (
    <ul className="list-group pt-0">
      {allTasks
        .filter(
          (el) =>
            !filter ||
            (filter==='active' && !el.isDone) ||
            (filter==='completed' && el.isDone)
        )
        .map((el) => (
          <TodoTask
            key={el._id}
            el={el}
            toast={toast}
            changeTask={changeTask}
            changeTaskStatus={changeTaskStatus}
            deleteSingleTask={deleteSingleTask}
          />
        ))}
    </ul>
  );
};

export default TodoTaskList;
