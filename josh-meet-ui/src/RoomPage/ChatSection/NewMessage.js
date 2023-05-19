import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
const NewMessage = () => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      console.log(event.key);
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

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message"
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
        alt="message"
      />
    </div>
  );
};

export default NewMessage;
