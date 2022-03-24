import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BasicDateTimePicker from "./BasicDateTimePicker";

const TodoTask = ({
  el,
  changeTask,
  toast,
  deleteSingleTask,
  editDateOfCompletion,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editTextData, setEditTextData] = useState(el.text);

  const composeTaskUpdate = (event) => {
    setEditTextData(editTextData.trim());
    if (event === "onChange") {
      changeTask(el._id, !el.isDone);
    } else if (editTextData.trim() === el.text.trim()) {
      setEditTextData(el.text);
      toast.warn("No any changes in task");
    } else if (editTextData && editTextData !== el.text) {
      changeTask(el._id, editTextData);
    } else {
      setEditTextData(el.text);
      toast.warn(
        "Please keep some text in changed task, spaces will be cutted"
      );
    }
    setEditMode(false);
  };
  const changeDate = (date) => {
    editDateOfCompletion(el._id, date);
  };
  return (
    <div className="position-relative">
      <input
        className="position-absolute form-check-input me-3 checkbox"
        type="checkbox"
        checked={el.isDone}
        value=""
        aria-label="..."
        onChange={(el) => {
          composeTaskUpdate(el._reactName);
        }}
      />
      <Accordion className="pointer task todoTask border">
        <AccordionSummary>
          <li
            className="d-flex w-100 position-relative rounded-0 align-items-center todoText"
            onDoubleClick={() => {
              setEditMode(true);
            }}
          >
            <h6 className="p-0 m-0">
              {!el.isDone ? el.text : <del>{el.text}</del>}
            </h6>
            <span className="date_to_be_done">{el.date_to_be_done}</span>
            <button
              type="button"
              className="btn-close position-absolute top-50 end-0 translate-middle-y delete_button"
              aria-label="Close"
              onClick={() => {
                deleteSingleTask(el._id);
              }}
            />
          </li>
        </AccordionSummary>
        <AccordionDetails
          onClick={() => {
            setEditMode(true);
          }}
        >
          <input
            resize={"none"}
            disabled={!editMode}
            className="w-100 p-2"
            type={"text"}
            target={"self"}
            autoFocus={true}
            value={editTextData}
            onKeyPress={(e) => {
              e.key === "Enter" && composeTaskUpdate();
            }}
            onBlur={composeTaskUpdate}
            onChange={(e) => {
              setEditTextData(e.target.value);
            }}
          />
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="fst-italic fw-light p-3">
              - Click on textarea to activate renaming of your Todo Task.
              <br />
              - Press "Enter" or click on free page space for closing edit mode.
              <br />- You can also resize youre area if you planned to write big
              ammount of text.
            </Typography>
            <BasicDateTimePicker
              date_to_be_done={el.date_to_be_done}
              changeDate={changeDate}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TodoTask;
