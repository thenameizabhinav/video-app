import React, { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import { setChatSection } from "../../store/action";
import { connect } from "react-redux";

const ChatButton = (props) => {
  const { setChatSectionAction } = props;
  const [chatButton, setChatButton] = useState(false);

  const handleChatButtonPressed = () => {
    setChatSectionAction(!chatButton);
    setChatButton(!chatButton);
  };
  
  return (
    <div className="video_button_container">
      <button onClick={handleChatButtonPressed}>
        <FaFacebookMessenger />
      </button>
    </div>
  );
};

const mapActionsStateToProps = (dispatch) => {
  return {
    setChatSectionAction: (chatSection) =>
      dispatch(setChatSection(chatSection)),
  };
};

export default connect(null, mapActionsStateToProps)(ChatButton);
