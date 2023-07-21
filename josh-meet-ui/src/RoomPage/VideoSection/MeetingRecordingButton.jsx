import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { setRecording } from "../../store/action";
import * as webRTCHandler from "../../utils/webRTCHandler";

const MeetingRecordingButton = (props) => {
  const { isHost, setRecordingAction, setIsRecordingToast } = props;
  const [isRecording, setIsRecording] = useState("empty");

  const buttonClassName = `video_button ${
    isRecording === "start" ? "video_button_disabled" : ""
  }`;

  const handleMeetingButtonPressed = () => {
    if (isRecording === "empty" || isRecording === "stop") {
      setRecordingAction(true);
      console.log("Meeting button pressed: true");
      setIsRecording("start");
      setIsRecordingToast("start");
    } else if (isRecording === "start") {
      setRecordingAction(false);
      console.log("Meeting button pressed: false");
      setIsRecording("stop");
      setIsRecordingToast("stop");
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
