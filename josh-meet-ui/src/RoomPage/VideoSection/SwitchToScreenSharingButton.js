import React, { useState } from "react";
import * as webRTCHandler from "../../utils/webRTCHandler";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
const constraints = {
  audio: false,
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

  return (
    <>
      <div className="video_button_container">
        <button onClick={handleScreenShareToggle} className="video_button">
          <span className="material-icons md-48">present_to_all</span>
        </button>
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default SwitchToScreenSharingButton;
