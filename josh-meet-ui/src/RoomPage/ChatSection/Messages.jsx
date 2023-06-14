import React from "react";
import { connect } from "react-redux";
import {
  MESSAGE_ALIGN_LEFT,
  MESSAGE_ALIGN_RIGHT,
  MESSAGE_LEFT_STYLES,
  MESSAGE_RIGHT_STYLES,
} from "../../utils/constants";

const Message = ({
  key,
  author,
  content,
  sameAuthor,
  messageCreatedByMe,
  chatTime,
}) => {
  const alignClass = messageCreatedByMe
    ? MESSAGE_ALIGN_RIGHT
    : MESSAGE_ALIGN_LEFT;
  const authorText = messageCreatedByMe ? "You" : author;
  const contentAdditionalStyles = messageCreatedByMe
    ? MESSAGE_RIGHT_STYLES
    : MESSAGE_LEFT_STYLES;

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && (
        <p className="message_title">
          {authorText}
          <span className="message_time">{` ${chatTime}`}</span>
        </p>
      )}
      <p className={`message_content ${contentAdditionalStyles}`}> {content}</p>
    </div>
  );
};

const Messages = ({ messages }) => {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;
        return (
          <Message
            key={`${message.content}${index}`}
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe}
            chatTime={message.chatTime}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Messages);
