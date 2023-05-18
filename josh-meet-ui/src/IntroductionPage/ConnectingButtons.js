import React from "react";
import ConnectingButton from "./ConnectingButton";
import { useNavigate } from "react-router-dom";

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const joinMeetingButtonHandler = () => {
    navigate("/join-room");
  };

  const createMeetingButtonHandler = () => {
    navigate("/join-room?host=true");
  };
  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={joinMeetingButtonHandler}
      />
      <ConnectingButton
        createRoomButton
        buttonText="Create a meeting"
        onClickHandler={createMeetingButtonHandler}
      />
    </div>
  );
};

export default ConnectingButtons;
