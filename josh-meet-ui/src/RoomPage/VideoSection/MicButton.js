import React, { useState } from "react";
import MicButtonImgOff from "../../resources/images/micOff.svg";
import MicButtonImg from "../../resources/images/mic.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? MicButtonImgOff : MicButtonImg}
        onClick={handleMicButtonPressed}
        className="video_button_image"
        alt="mic"
      />
    </div>
  );
};

export default MicButton;
