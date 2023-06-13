import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) => {
  const buttonClass = createRoomButton
    ? "create_room_button"
    : "join_room_button";

  return (
    <Button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </Button>
  );
};

export default ButtonComponent;
