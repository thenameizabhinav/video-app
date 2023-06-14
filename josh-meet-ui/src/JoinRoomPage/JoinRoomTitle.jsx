import React from "react";
import { HOST_MEETING, JOIN_MEETING } from "../utils/constants";
import "./joinRoomPage.css";

const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? HOST_MEETING : JOIN_MEETING;
  return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;
