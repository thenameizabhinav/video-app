import React, { useEffect } from "react";
import "./RoomPage.css";
import VideoSection from "./VideoSection/VideoSection";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./RoomLabel";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler.js";
import Overlay from "./Overlay";

const RoomPage = ({ roomId, identity, isRoomHost, showOverlay }) => {
  useEffect(() => {
    webRTCHandler.getLocalPreviewandInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);
  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
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
