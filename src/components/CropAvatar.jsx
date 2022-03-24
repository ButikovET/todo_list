import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../api/cropImage'

const CropAvatar = ({photo, setCroppedPhoto}) => {
    
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    const croppedImgUrl = await getCroppedImg(photo, croppedAreaPixels);
    setCroppedPhoto(croppedImgUrl);
  }, [])

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={photo}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
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
          max={2}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
          className="zoom-range"
        />
      </div>
    </div>
  )
}
    
export default CropAvatar;