import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const LeaveRoomButton = () => {
  const handleRoomDisconnection = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>Leave Call</strong>
    </Tooltip>
  );

  return (
    <div className="video_button_container">
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button onClick={handleRoomDisconnection} className="video_end_button">
          <span class="material-icons">call_end</span>
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default LeaveRoomButton;
