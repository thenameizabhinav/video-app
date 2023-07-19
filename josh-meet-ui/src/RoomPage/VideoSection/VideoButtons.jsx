import React from "react";
import { connect } from "react-redux";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import ParticipantsButton from "./ParticipantsButton";
import ChatButton from "./ChatButton";
import MeetingRecordingButton from "./MeetingRecordingButton";
import TimerComponent from "./TimerComponent";

const VideoButtons = (props) => {
  const { isRoomHost } = props;
  return (
    <div className="video_buttons_container">
      <TimerComponent />
      <MicButton />
      <CameraButton />
      <SwitchToScreenSharingButton />
      <LeaveRoomButton />
      <ParticipantsButton />
      <ChatButton />
      <MeetingRecordingButton isHost={isRoomHost} />
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps, null)(VideoButtons);
