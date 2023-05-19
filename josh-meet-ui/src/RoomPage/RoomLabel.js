import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const RoomLabel = ({ roomId }) => {
  return (
    <div className="room_label">
      <CopyToClipboard className="room_label_paragraph" text={roomId}>
        <button>
          <span className="copy_button">Click to Copy Id</span>
          {`  ${roomId}`}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default RoomLabel;
