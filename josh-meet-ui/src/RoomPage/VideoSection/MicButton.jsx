import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { TURN_OFF_MICROPHONE, TURN_ON_MICROPHONE } from "../../utils/constants";

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  const buttonClassName = `video_button ${
    isMicMuted ? "video_button_disabled" : ""
  }`;

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>{isMicMuted ? TURN_ON_MICROPHONE : TURN_OFF_MICROPHONE}</strong>
    </Tooltip>
  );

  return (
    <div className="video_button_container">
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button id="mute-button" onClick={handleMicButtonPressed} className={buttonClassName}>
          {!isMicMuted ? (
            <span className="material-icons">mic</span>
          ) : (
            <span className="material-icons">mic_off</span>
          )}
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default MicButton;
