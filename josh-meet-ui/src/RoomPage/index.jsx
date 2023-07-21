import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import VideoButtons from "./VideoSection/VideoButtons";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./roomLabel.jsx";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./overlay.jsx";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./roomPage.css";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  chatSection,
  participantSection,
}) => {
  const [showStartToast, setShowStartToast] = useState(true);
  const [showStopToast, setShowStopToast] = useState(true);
  const [isRecordingToast, setIsRecordingToast] = useState("empty");
  const toggleShowStopToast = () => setShowStopToast(!showStopToast);

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

  useEffect(() => {
    if (isRecordingToast === "stop") {
      setShowStopToast(true);
    }
  }, [isRecordingToast]);

  return (
    <div className="room_container">
      <VideoButtons setIsRecordingToast={setIsRecordingToast} />
      {participantSection && <ParticipantsSection />}
      {chatSection && <ChatSection />}
      <RoomLabel roomId={roomId} />
      {isRecordingToast === "start" && (
        <ToastContainer className="p-3" position="top-end">
          <Toast show={showStartToast} bg="dark">
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Meeting Recording Started</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      )}
      {isRecordingToast === "stop" && (
        <ToastContainer className="p-3" position="top-end">
          <Toast
            show={showStopToast}
            delay={5000}
            autohide
            bg="dark"
            onClose={toggleShowStopToast}
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Meeting Recording Stopped</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      )}
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
