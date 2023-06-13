import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ButtonComponent = ({
  buttonText,
  cancelButton = false,
  onClickHandler,
}) => {
  const buttonClass = cancelButton
    ? "join_room_cancel_button"
    : "join_room_success_button";

  return (
    <Button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </Button>
  );
};

const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }) => {
  const navigate = useNavigate();
  const successButtonText = isRoomHost ? "Host" : "Join";

  const pushToIntroductionPage = () => {
    navigate("/");
  };

  return (
    <div className="join_room_buttons_container">
      <ButtonComponent
        buttonText={successButtonText}
        onClickHandler={handleJoinRoom}
      />
      <ButtonComponent
        buttonText="Cancel"
        cancelButton
        onClickHandler={pushToIntroductionPage}
      />
    </div>
  );
};

export default JoinRoomButtons;
