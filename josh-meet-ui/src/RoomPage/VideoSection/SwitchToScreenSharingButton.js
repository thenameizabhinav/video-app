import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);

  const handleScreenShareToggle = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <div className="video_button_container">
      <img
        src={SwitchImg}
        className="video_button_image"
        onClick={handleScreenShareToggle}
        alt="screen-sharing"
      />
    </div>
  );
};

export default SwitchToScreenSharingButton;
