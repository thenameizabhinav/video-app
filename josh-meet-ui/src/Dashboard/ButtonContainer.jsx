import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

const ButtonContainer = () => {
  const navigate = useNavigate();

  const joinMeetingButtonHandler = () => {
    navigate("/join-room");
  };

  const createMeetingButtonHandler = () => {
    navigate("/join-room?host=true");
  };

  return (
    <div className="connecting_buttons_container">
      <ButtonComponent
        buttonText="Join a meeting"
        onClickHandler={joinMeetingButtonHandler}
      />
      <ButtonComponent
        createRoomButton
        buttonText="Create a meeting"
        onClickHandler={createMeetingButtonHandler}
      />
    </div>
  );
};

export default ButtonContainer;
