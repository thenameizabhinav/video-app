import React, { useEffect } from "react";
import { connect } from "react-redux";
import { history } from "../App";
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

  useEffect(() => {
    window.addEventListener(
      "popstate",
      function (event) {
        const siteUrl = window.location.origin;
        window.location.href = siteUrl;
      },
      false
    );
  }, []);

  return (
    <div className="room_container">
      {/* <div className="timestamp-meeting-id-container">
        <span>timestamp</span>
        <span>meeting id</span>
      </div> */}
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
