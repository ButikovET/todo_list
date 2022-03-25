import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../api/cropImage";

const CropAvatar = ({ photo, setCroppedPhoto }) => {
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    const croppedImgUrl = await getCroppedImg(photo, croppedAreaPixels);
    setCroppedPhoto(croppedImgUrl);
  }, [photo]);
  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={photo}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={5}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
          className="zoom-range"
        />
      </div>
    </div>
  );
};

export default CropAvatar;
