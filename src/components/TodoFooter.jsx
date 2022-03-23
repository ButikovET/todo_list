import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import React from "react";

const TodoFooter = ({
  itemsLength,
  activeLength,
  completedLength,
  clearCompleted,
  filter,
  setFilter,
  onPageChange,
  currentPage,
  totalPages,
  onTodoInOnePageChanged,
  todosInOnePage,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-3 border_footer">
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
      <FormControl className="m-2">
        <InputLabel id="demo-simple-select-label">Todos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={5}
          value={Number(todosInOnePage)}
          label="Age"
          onChange={onTodoInOnePageChanged}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        count={totalPages}
        page={Number(currentPage)}
        color="primary"
        onClick={onPageChange}
      />
      <div className="d-flex align-self-center justify-content-center">
        <div
          className={`rounded align-self-center p-2 pointer buttonBorder ${
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

export default TodoFooter;
