import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { SEND_A_MESSAGE } from "../../utils/constants";

const NewMessage = () => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      sendMessage();
      console.log("sending message to other users");
    }
  };

  const sendMessage = () => {
    if (message.length > 0) {
      webRTCHandler.sendMessageUsingDataChannel(message);
      setMessage("");
    }
  };

  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Send Message</strong>
    </Tooltip>
  );

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder={SEND_A_MESSAGE}
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button className="new_message_button" onClick={sendMessage}>
          <span className="material-icons">send</span>
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default NewMessage;
