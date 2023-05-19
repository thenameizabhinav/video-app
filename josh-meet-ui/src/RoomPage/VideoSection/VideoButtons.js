import React from "react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import ParticipantsButton from "./ParticipantsButton";
import ChatButton from "./ChatButton";

const VideoButtons = () => {
  return (
    <div className="video_buttons_container">
      <MicButton />
      <CameraButton />
      <SwitchToScreenSharingButton />
      <LeaveRoomButton />
      <ParticipantsButton />
      <ChatButton />
    </div>
  );
};

export default VideoButtons;
