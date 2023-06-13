import React from "react";
import { connect } from "react-redux";

const SingleParticipant = (props) => {
  const { identity, lastItem, participant } = props;
  let avatar = '';
  // get the value of avatar name.
  identity.split(' ').forEach((x, index) => {if (x && index <= 1){avatar = avatar + x[0].toLocaleUpperCase()}});

  return (
    <>
      <div className="participant-wrapper">
        <div className="participant-info">
          <span className="participant-avatar">{avatar}</span>
          <p className="participants-paragraph">{identity}</p>
        </div>
        <div class="participant-options">
          <div className="participant-mic">
            <button className="mic-button button-without-style">
              <span className="material-icons">mic_off</span>
            </button>
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
