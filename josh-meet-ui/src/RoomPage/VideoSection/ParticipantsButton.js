import React, { useState } from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { setParticipantSection } from "../../store/action";
import { connect } from "react-redux";

const ParticipantsButton = (props) => {
  const { setPartcipantSectionAction } = props;
  const [participantButton, setParticipantButton] = useState(false);

  const handleParticipantButtonPressed = () => {
    setPartcipantSectionAction(!participantButton);
    setParticipantButton(!participantButton);
  };

  return (
    <div className="video_button_container">
      <button onClick={handleParticipantButtonPressed}>
        <FaPeopleArrows />
      </button>
    </div>
  );
};

const mapActionsStateToProps = (dispatch) => {
  return {
    setPartcipantSectionAction: (participantSection) =>
      dispatch(setParticipantSection(participantSection)),
  };
};

export default connect(null, mapActionsStateToProps)(ParticipantsButton);
