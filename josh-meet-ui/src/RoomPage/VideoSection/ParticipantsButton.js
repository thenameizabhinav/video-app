import React, { useState } from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { setParticipantSection, setChatSection } from "../../store/action";
import { connect } from "react-redux";

const ParticipantsButton = (props) => {
  const { setPartcipantSectionAction, setChatSectionAction, chatSection } =
    props;
  const [participantButton, setParticipantButton] = useState(false);

  const handleParticipantButtonPressed = () => {
    setParticipantButton(!participantButton);
    if (chatSection) setChatSectionAction(!chatSection);
    setPartcipantSectionAction(!participantButton);
  };

  return (
    <div className="video_button_container">
      <button onClick={handleParticipantButtonPressed}>
        <FaPeopleArrows />
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
    setPartcipantSectionAction: (participantSection) =>
      dispatch(setParticipantSection(participantSection)),
    setChatSectionAction: (chatSection) =>
      dispatch(setChatSection(chatSection)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsStateToProps
)(ParticipantsButton);
