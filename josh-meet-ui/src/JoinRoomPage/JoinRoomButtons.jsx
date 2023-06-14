import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  JOIN,
  JOIN_ROOM_CANCEL_BUTTON,
  JOIN_ROOM_SUCCESS_BUTTON,
  HOST,
} from "../utils/constants";

const ButtonComponent = ({
  buttonText,
  cancelButton = false,
  onClickHandler,
}) => {
  const buttonClass = cancelButton
    ? JOIN_ROOM_CANCEL_BUTTON
    : JOIN_ROOM_SUCCESS_BUTTON;

  return (
    <Button
      variant={cancelButton ? "danger" : "success"}
      className={buttonClass}
      onClick={onClickHandler}
    >
      {buttonText}
    </Button>
  );
};

const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }) => {
  const navigate = useNavigate();
  const successButtonText = isRoomHost ? HOST : JOIN;

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
