import React, { useState } from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  const buttonClassName = `video_button ${
    isMicMuted ? "video_button_disabled" : ""
  }`;

  return (
    <div className="video_button_container">
      <button onClick={handleMicButtonPressed} className={buttonClassName}>
        {!isMicMuted ? (
          <span className="material-icons">mic</span>
        ) : (
          <span className="material-icons">mic_off</span>
        )}
      </button>
    </div>
  );
};

export default MicButton;
