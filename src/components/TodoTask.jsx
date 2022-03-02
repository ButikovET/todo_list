import React, { useState } from "react";

const TodoTask = ({ el, changeTask, changeTaskStatus, deleteSingleTask, remindTask, setRemindTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTextData, setEditTextData] = useState(el.text);

  const composeTaskUpdate = () => {
    if(editTextData.trim())
    {
      changeTask(el.id, editTextData);
    }
    else {
      setEditTextData(el.text);
      setRemindTask(true);
    }
    setEditMode(false);
  };

  return (
    <li
      className="d-flex list-group-item position-relative pointer rounded-0 task align-items-center p-3 todoTask"
      onDoubleClick={() => {
        setEditMode(true);
        remindTask&&setRemindTask(false);
      }}
    >
      <input
        className="form-check-input me-3 checkbox "
        type="checkbox"
        checked={el.isDone}
        value=""
        aria-label="..."
        onChange={() => {
          changeTaskStatus(el.id);
        }}
      />
      {editMode ? (
        <input
          className="w-75"
          type={"text"}
          autoFocus={true}
          value={editTextData}
          onKeyPress={(e) => {
            e.key === "Enter"&&composeTaskUpdate();
            }
          }
          onBlur={composeTaskUpdate}
          onChange={(e) => {
            setEditTextData(e.target.value);
          }}
        />
      ) : !el.isDone ? (
        el.text
      ) : (
        <del>{el.text}</del>
      )}
      <button
        type="button"
        className="btn-close position-absolute top-50 end-0 translate-middle-y delete_button"
        aria-label="Close"
        onClick={() => {
          deleteSingleTask(el.id);
        }}
      />
    </li>
  );
};

export default TodoTask;
