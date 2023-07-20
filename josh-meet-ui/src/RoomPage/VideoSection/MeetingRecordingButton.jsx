import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { setRecording } from "../../store/action";
import * as webRTCHandler from "../../utils/webRTCHandler";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const MeetingRecordingButton = (props) => {
  const { isHost, setRecordingAction } = props;
  const [isRecording, setIsRecording] = useState("empty");
  const [showToast, setShowToast] = useState(true);

  const toggleShowToast = () => setShowToast(!showToast);

  const buttonClassName = `video_button ${
    isRecording === "start" ? "video_button_disabled" : ""
  }`;

  const handleMeetingButtonPressed = () => {
    if (isRecording === "empty" || isRecording === "stop") {
      setRecordingAction(true);
      console.log("Meeting button pressed: true");
      setIsRecording("start");
    } else if (isRecording === "start") {
      setRecordingAction(false);
      console.log("Meeting button pressed: false");
      setIsRecording("stop");
    }
  };

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>
        {isRecording === "empty" || isRecording === "stop"
          ? "Start Recording"
          : "Stop Recording"}
      </strong>
    </Tooltip>
  );

  useEffect(() => {
    if (isRecording === "start") {
      webRTCHandler.startRecording(null);
    } else if (isRecording === "stop") {
      webRTCHandler.stopRecording(true);
    }
  }, [isRecording]);

  return (
    <>
      {/* {isRecording === "start" && (
        <ToastContainer className="p-3" position="top-center">
          <Toast
            show={showToast}
            delay={3000}
            autohide
            onClose={toggleShowToast}
            bg="dark"
          >
            <Toast.Header>
              <strong className="me-auto">Meeting Recording Started</strong>
            </Toast.Header>
            <Toast.Body className="text-white"></Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      {isRecording === "stop" && (
        <ToastContainer className="p-3" position="top-center">
          <Toast
            show={showToast}
            delay={3000}
            autohide
            onClose={toggleShowToast}
            bg="dark"
          >
            <Toast.Header>
              <strong className="me-auto">Meeting Recording Stopped</strong>
            </Toast.Header>
            <Toast.Body className="text-white"></Toast.Body>
          </Toast>
        </ToastContainer>
      )} */}
      <div className="video_button_container">
        <OverlayTrigger placement="top" overlay={tooltip}>
          <button
            onClick={handleMeetingButtonPressed}
            className={buttonClassName}
            disabled={!isHost}
          >
            {isRecording === "empty" || isRecording === "stop" ? (
              <span className="material-icons">fiber_manual_record</span>
            ) : (
              <span className="material-icons">stop</span>
            )}
          </button>
        </OverlayTrigger>
      </div>
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsStateToProps = (dispatch) => {
  return {
    setRecordingAction: (recording) => dispatch(setRecording(recording)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsStateToProps
)(MeetingRecordingButton);
