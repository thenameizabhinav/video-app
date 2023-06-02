import React, { useState } from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const constraints = {
  audio: true,
  video: true,
};

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occured when trying to get an access to screen share stream"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        //execute here function to switch the video track which we are sending to other
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);

      //switch for video track from camera
      setIsScreenSharingActive(false);

      //stop screen share stream
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>
        {isScreenSharingActive ? "You are presenting" : "Present now"}
      </strong>
    </Tooltip>
  );

  const buttonClassName = `video_button ${
    isScreenSharingActive ? "participant_button_clicked" : ""
  }`;

  return (
    <>
      <div className="video_button_container">
        <OverlayTrigger placement="top" overlay={tooltip}>
          <button onClick={handleScreenShareToggle} className={buttonClassName}>
            <span className="material-icons md-48">present_to_all</span>
          </button>
        </OverlayTrigger>
      </div>
      {/* disabled temp */}
      {/* {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )} */}
    </>
  );
};

export default SwitchToScreenSharingButton;
