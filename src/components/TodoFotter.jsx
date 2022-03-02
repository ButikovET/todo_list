import React from "react";

const TodoFotter = ({
  itemsLength,
  activeLength,
  completedLength,
  clearCompleted,
  filter,
  setFilter,
}) => {
  return (
    <div className="d-flex justify-content-between px-3 border_footer">
      <div className="align-self-center">
        {!filter
          ? `${itemsLength} ${filter} item${itemsLength === 1 ? "" : "s"}${
              !itemsLength ? "" : " left"
            }`
          : filter == "active"
          ? `${activeLength} ${filter} item${activeLength === 1 ? "" : "s"}${
              !activeLength ? "" : " left"
            }`
          : `${completedLength} ${filter} item${
              completedLength === 1 ? "" : "s"
            }${!completedLength ? "" : " left"}`}
      </div>
      <div className="d-flex align-self-center justify-content-center">
        <div
          className={`align-self-center p-2 pointer buttonBorder ${
            !filter && " targeted"
          }`}
          onClick={() => {
            setFilter("");
          }}
        >
          All
        </div>
        <div
          className={`align-self-center p-2 pointer buttonBorder ${
            filter == "active" && " targeted"
          }`}
          onClick={() => {
            setFilter("active");
          }}
        >
          Active
        </div>
        <div
          className={`align-self-center p-2 pointer buttonBorder ${
            filter == "completed" && " targeted"
          }`}
          onClick={() => {
            setFilter("completed");
          }}
        >
          Completed
        </div>
      </div>
      <div
        className="align-self-center p-2 pointer buttonBorder"
        onClick={clearCompleted}
      >
        Clear completed
      </div>
    </div>
  );
};

export default TodoFotter;
