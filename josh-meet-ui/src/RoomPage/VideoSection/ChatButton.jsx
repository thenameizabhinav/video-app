import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { setChatSection } from "../../store/action";
import { setParticipantSection } from "../../store/action";

const ChatButton = (props) => {
  const {
    setChatSectionAction,
    setPartcipantSectionAction,
    participantSection,
  } = props;
  const [chatButton, setChatButton] = useState(false);

  const handleChatButtonPressed = () => {
    setChatButton(!chatButton);
    if (participantSection) setPartcipantSectionAction(!participantSection);
    setChatSectionAction(!chatButton);
  };

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>Chat with everyone</strong>
    </Tooltip>
  );

  const buttonClassName = `video_button ${
    chatButton ? "chat_button_clicked" : ""
  }`;

  useEffect(() => {
    const videosContainer = document.getElementById("videos_portal");
    const list = videosContainer.classList;
    if (chatButton) {
      list.replace("videos_portal_styles", "videos_portal_styles_80");
    } else {
      list.replace("videos_portal_styles_80", "videos_portal_styles");
    }
  }, [chatButton]);

  return (
    <div className="video_button_container">
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button onClick={handleChatButtonPressed} className={buttonClassName}>
          <span className="material-icons">chat</span>
        </button>
      </OverlayTrigger>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsStateToProps = (dispatch) => {
  return {
    setChatSectionAction: (chatSection) =>
      dispatch(setChatSection(chatSection)),
    setPartcipantSectionAction: (participantSection) =>
      dispatch(setParticipantSection(participantSection)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsStateToProps
)(ChatButton);
