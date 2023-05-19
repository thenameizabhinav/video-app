import React, { useEffect } from "react";
import "./RoomPage.css";
import VideoSection from "./VideoSection/VideoSection";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./RoomLabel";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler.js";
import Overlay from "./Overlay";
import { CopyToClipboard } from "react-copy-to-clipboard";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  chatSection,
  participantSection,
}) => {
  useEffect(() => {
    webRTCHandler.getLocalPreviewandInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);

  console.log("hi", chatSection, participantSection);
  return (
    <div className="room_container">
      <VideoSection />
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
