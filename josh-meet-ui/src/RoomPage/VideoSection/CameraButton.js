import React, { useState } from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const CameraButton = () => {
  const [isLocalVideoDisable, setIsLocalVideoDisabled] = useState(false);
  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisable);
    setIsLocalVideoDisabled(!isLocalVideoDisable);
  };
  const buttonClassName = `video_button ${
    isLocalVideoDisable ? "video_button_disabled" : ""
  }`;

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>
        {isLocalVideoDisable ? "Turn on camera" : "Turn off camera"}
      </strong>
    </Tooltip>
  );

  return (
    <div className="video_button_container">
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button onClick={handleCameraButtonPressed} className={buttonClassName}>
          {!isLocalVideoDisable ? (
            <span className="material-icons">videocam</span>
          ) : (
            <span className="material-icons">videocam_off</span>
          )}
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default CameraButton;
