import React, { useEffect } from "react";
import { connect } from "react-redux";
import VideoButtons from "./VideoSection/VideoButtons";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./roomLabel.jsx";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./overlay.jsx";
import "./roomPage.css";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  chatSection,
  participantSection,
}) => {
  if (!isRoomHost && !roomId) {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  } else {
    useEffect(() => {
      webRTCHandler.getLocalPreviewandInitRoomConnection(
        isRoomHost,
        identity,
        roomId
      );
    }, []);
  }

  return (
    <div className="room_container">
      <VideoButtons />
      {participantSection && <ParticipantsSection />}
      {chatSection && <ChatSection />}
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
