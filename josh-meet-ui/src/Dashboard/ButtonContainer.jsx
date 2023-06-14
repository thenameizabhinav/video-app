import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import { CREATE_A_MEETING, JOIN_A_MEETING } from "../utils/constants";

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
        buttonText={JOIN_A_MEETING}
        onClickHandler={joinMeetingButtonHandler}
      />
      <ButtonComponent
        createRoomButton
        buttonText={CREATE_A_MEETING}
        onClickHandler={createMeetingButtonHandler}
      />
    </div>
  );
};

export default ButtonContainer;
