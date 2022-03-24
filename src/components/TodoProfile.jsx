import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersAPI } from "../api/axiosAPI";
import { updateUserThunk } from "../redux/todoSlice";
import CropAvatar from "./CropAvatar";
import DragDrop from "./LoginWindow/DragDrop";

const TodoProfile = ({name}) =>{
    const basePhoto = localStorage.getItem('todo_photo');
    const baseCroppedPhoto = localStorage.getItem('todo_cropped_photo');
    const [photo, setPhoto] = useState(basePhoto);
    const [croppedPhoto, setCroppedPhoto] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [myName, changeMyName] = useState(name);
    const dispatch = useDispatch();

    const loadNewPhoto = (photo) => {
          const  reader = new FileReader();
          reader.onload = (e) => {
            setPhoto(e.target.result)
          };
          reader.onerror = (e) => {
            console.log("Error : " + e.type);
          };
          reader.readAsDataURL(photo)
        }

        const onSave = () => {
            const updates = {};
            let imageChanged = false;
            if(name!=myName)updates.name=myName;
            if(basePhoto!=photo){
                updates.photo=photo;
                imageChanged=true;
            };
            if(baseCroppedPhoto!=croppedPhoto){
                updates.croppedPhoto=croppedPhoto;
                imageChanged=true
            }
            if(Object.keys(updates).length !== 0)dispatch(updateUserThunk(updates));
            setEditMode(false);
            if(imageChanged){
                localStorage.setItem('todo_photo', photo?photo:basePhoto);
                localStorage.setItem('todo_cropped_photo', croppedPhoto);
            }
        }
        const changeEditMode = () =>{
            changeMyName(name);
            setEditMode(!editMode);
        }
    return (
        <>
            <img className="position-fixed top-0 start-0 m-3 bg-body avatar" src={baseCroppedPhoto} alt="ava" onClick={changeEditMode}/>
            {editMode&&
            <div className="cropAvatarContainer showedCropAvatarContainer">
                <CropAvatar photo={photo} setCroppedPhoto={setCroppedPhoto}/>
            </div>}
            <div className={editMode?"profileEditor showedProfileEditor":"profileEditor"}>
                <h3>Change your Profile</h3>
                <br />
                <label htmlFor="inputName3">
                    Change Name
                </label>
                <input
                    required={true}
                    type="text"
                    className="form-control"
                    value={myName}
                    id="inputName3"
                    onChange={(e)=>{changeMyName(e.target.value)}}/>
                    <br />
                <label className="form-label">New Avatar Image</label>
                <DragDrop setPhoto={setPhoto} editMode={editMode} loadNewPhoto={loadNewPhoto}/>
                <br />
                <div className="profileEditor_buttons_frame d-flex w-100 justify-content-evenly">
                    <button type="button" className="btn btn-primary" onClick={onSave}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={changeEditMode}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default TodoProfile;