import React from "react";
import { connect } from "react-redux";

const MeetingInfo = ({ roomId }) => {
  return (
    <div className="meeting_info_container">
      <CopyToClipboard text={roomId}>
        <button>
          <span>Meeting Id: {roomId}</span>
        </button>
      </CopyToClipboard>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(MeetingInfo);
