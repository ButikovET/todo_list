import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../redux/todoSlice";
import CropAvatar from "./CropAvatar";
import DragDrop from "./LoginWindow/DragDrop";

const TodoProfile = ({ name }) => {
  const basePhoto = localStorage.getItem("todo_photo");
  const baseCroppedPhoto = localStorage.getItem("todo_cropped_photo")||basePhoto;
  const [photo, setPhoto] = useState(basePhoto);
  const [croppedPhoto, setCroppedPhoto] = useState(baseCroppedPhoto);
  const [editMode, setEditMode] = useState(false);
  const [myName, changeMyName] = useState(name);
  const dispatch = useDispatch();
  const loadNewPhoto = (el) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      await setPhoto(e.target.result);
      await setCroppedPhoto(e.target.result);
    };
    reader.onerror = (e) => {
      console.log("Error : " + e.type);
    };
    reader.readAsDataURL(el);
  };

  const onSave = () => {
    const updates = {};
    updates.name = myName;
    updates.photo = photo;
    updates.croppedPhoto = croppedPhoto;
    localStorage.setItem("todo_photo", photo);
    localStorage.setItem("todo_cropped_photo", croppedPhoto);
    dispatch(updateUserThunk(updates));
    setEditMode(false);
  };
  const changeEditMode = () => {
    changeMyName(name);
    setEditMode(!editMode);
  };
  return (
    <>
      <img
        className="position-fixed top-0 start-0 m-3 bg-body avatar"
        src={baseCroppedPhoto||basePhoto}
        alt="ava"
        onClick={changeEditMode}
      />
      {editMode && (
        <div className="cropAvatarContainer showedCropAvatarContainer">
          <CropAvatar
            photo={photo}
            setCroppedPhoto={setCroppedPhoto}
          />
        </div>
      )}
      <div
        className={
          editMode ? "profileEditor showedProfileEditor" : "profileEditor"
        }
      >
        <h3>Change your Profile</h3>
        <br />
        <label htmlFor="inputName3">Change Name</label>
        <input
          required={true}
          type="text"
          className="form-control"
          value={myName}
          id="inputName3"
          onChange={(e) => {
            changeMyName(e.target.value);
          }}
        />
        <br />
        <label className="form-label">New Avatar Image</label>
        <DragDrop
          setPhoto={setPhoto}
          setCroppedPhoto={setCroppedPhoto}
          editMode={editMode}
          loadNewPhoto={loadNewPhoto}
        />
        <br />
        <div className="profileEditor_buttons_frame d-flex w-100 justify-content-evenly">
          <button type="button" className="btn btn-primary" onClick={onSave}>
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={changeEditMode}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoProfile;
