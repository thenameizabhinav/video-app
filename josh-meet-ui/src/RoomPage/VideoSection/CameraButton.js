import React, { useState } from "react";
import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

const CameraButton = () => {
  const [isLocalVideoDisable, setIsLocalVideoDisabled] = useState(false);
  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisable);
    setIsLocalVideoDisabled(!isLocalVideoDisable);
  };

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoDisable ? CameraButtonImgOff : CameraButtonImg}
        className="video_button_image"
        onClick={handleCameraButtonPressed}
        alt="camera"
      />
    </div>
  );
};

export default CameraButton;
