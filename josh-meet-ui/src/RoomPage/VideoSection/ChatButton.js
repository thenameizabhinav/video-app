import React, { useState } from "react";
import { setChatSection } from "../../store/action";
import { setParticipantSection } from "../../store/action";
import { connect } from "react-redux";

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


  return (
    <div className="video_button_container">
      <button onClick={handleChatButtonPressed} className="video_button ">
        <span className="material-icons">chat</span>
      </button>
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
