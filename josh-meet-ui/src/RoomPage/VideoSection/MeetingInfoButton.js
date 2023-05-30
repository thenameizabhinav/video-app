import React from "react";
import { FaICursor } from "react-icons/fa";

const MeetingInfoButton = () => {
  const [isMeetingInfoButtonClicked, setIsMeetingInfoButtonClicked] =
    useState(false);

  const handleMeetingInfoButton = () => {
    setIsMeetingInfoButtonClicked(!isMeetingInfoButtonClicked);
  };

  return (
    <div className="video_button_container">
      <button onClick={handleMeetingInfoButton} className="video_button">
        <FaICursor />
      </button>
    </div>
  );
};

export default MeetingInfoButton;
