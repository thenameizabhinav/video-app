import React, { useState } from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";

const CameraButton = () => {
  const [isLocalVideoDisable, setIsLocalVideoDisabled] = useState(false);
  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisable);
    setIsLocalVideoDisabled(!isLocalVideoDisable);
  };
  const buttonClassName = `video_button ${
    isLocalVideoDisable ? "video_button_disabled" : ""
  }`;

  return (
    <div className="video_button_container">
      <button onClick={handleCameraButtonPressed} className={buttonClassName}>
        {!isLocalVideoDisable ? (
          <span className="material-icons">videocam</span>
        ) : (
          <span className="material-icons">videocam_off</span>
        )}
      </button>
    </div>
  );
};

export default CameraButton;
