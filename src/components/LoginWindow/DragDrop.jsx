import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

function DragDrop({ setPhoto, editMode, loadNewPhoto }) {
  const handleChange = (file) => {
    setPhoto(file);
    if (editMode) loadNewPhoto(file);
  };
  return (
    <FileUploader
      className="dragdrop"
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    />
  );
}

export default DragDrop;
