import React from "react";
import { Button } from "react-bootstrap";
import { CREATE_ROOM_BUTTON, JOIN_ROOM_BUTTON } from "../utils/constants";

const ButtonComponent = ({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) => {
  const buttonClass = createRoomButton ? CREATE_ROOM_BUTTON : JOIN_ROOM_BUTTON;

  return (
    <Button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </Button>
  );
};

export default ButtonComponent;
