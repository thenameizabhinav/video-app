import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import * as wss from "../../utils/wss";

const SingleParticipant = (props) => {
  const { identity, lastItem, participant, audioEnabled } = props;
  let avatar = "";
  // get the value of avatar name.
  identity.split(" ").forEach((x, index) => {
    if (x && index <= 1) {
      avatar = avatar + x[0].toLocaleUpperCase();
    }
  });

  const handleMicButtonPressed = () => {
    if (audioEnabled) {
      console.log("Muting user " + participant.socketId);
      wss.muteUser(participant.socketId, true);
    } else {
      console.log("Cannot unmute " + participant.socketId);
    }
  };

  const tooltip = (
    <Tooltip id="tooltip" style={{ position: "fixed" }}>
      <strong>{audioEnabled ? "Mute user" : "Cannot unmute a user"}</strong>
    </Tooltip>
  );

  return (
    <>
      <div className="participant-wrapper">
        <div className="participant-info">
          <span className="participant-avatar">{avatar}</span>
          <p className="participants-paragraph">{identity}</p>
        </div>
        <div className="participant-options">
          <div className="participant-mic">
            <OverlayTrigger placement="top" overlay={tooltip}>
              <button className="mic-button button-without-style" onClick={handleMicButtonPressed} disabled={!audioEnabled}>
                {audioEnabled ? (
                <span className="material-icons">mic</span>
                ) : (
                  <span className="material-icons">mic_off</span>
                )}
              </button>
            </OverlayTrigger>
          </div>
          <div className="participant-more">
            <span>
              <button className="button-without-style">
                <span className="material-icons">more_vert</span>
              </button>
            </span>
          </div>
        </div>
      </div>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = ({ participants }) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.identity + Math.random()}
            lastItem={participants.length === index + 1}
            participant={participant}
            identity={participant.identity}
            audioEnabled={participant.audioEnabled}
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
export default connect(mapStoreStateToProps)(Participants);
