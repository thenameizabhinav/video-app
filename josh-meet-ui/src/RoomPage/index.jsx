import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { history } from "../App";
import VideoButtons from "./VideoSection/VideoButtons";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./roomLabel.jsx";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./overlay.jsx";
import "./roomPage.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

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
  const toggleShowStartToast = () => setShowStartToast(!showStartToast);
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
      setShowStartToast(true);
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
          <Toast
            show={showStartToast}
            delay={3000}
            autohide
            onClose={toggleShowStartToast}
            bg="dark"
          >
            <Toast.Header>
              <strong className="me-auto">Meeting Recording Started</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      )}
      {isRecordingToast === "stop" && (
        <ToastContainer className="p-3" position="top-end">
          <Toast
            show={showStopToast}
            delay={3000}
            autohide
            onClose={toggleShowStopToast}
            bg="dark"
          >
            <Toast.Header>
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
