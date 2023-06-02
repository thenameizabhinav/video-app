import React, { useState } from "react";
import { setParticipantSection, setChatSection } from "../../store/action";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const ParticipantsButton = (props) => {
  const { setPartcipantSectionAction, setChatSectionAction, chatSection } =
    props;
  const [participantButton, setParticipantButton] = useState(false);

  const handleParticipantButtonPressed = () => {
    setParticipantButton(!participantButton);
    if (chatSection) setChatSectionAction(!chatSection);
    setPartcipantSectionAction(!participantButton);
  };

  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Show participants</strong>
    </Tooltip>
  );

  const buttonClassName = `video_button ${
    participantButton ? "participant_button_clicked" : ""
  }`;

  return (
    <div className="video_button_container">
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button
          onClick={handleParticipantButtonPressed}
          className={buttonClassName}
        >
          <span className="material-icons">people</span>
        </button>
      </OverlayTrigger>
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
