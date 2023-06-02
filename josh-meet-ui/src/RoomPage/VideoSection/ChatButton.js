import React, { useState } from "react";
import { setChatSection } from "../../store/action";
import { setParticipantSection } from "../../store/action";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

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
