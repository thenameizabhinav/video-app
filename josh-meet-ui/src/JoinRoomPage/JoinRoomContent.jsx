import React, { useState } from "react";
import JoinRoomInput from "./JoinRoomInput";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../store/action";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import { getRoomExists } from "../utils/api";
import {
  MEETING_ID_NOT_FOUND_PLEASE_CHECK_YOUR_MEETING_ID,
  MEETING_IS_FULL_PLEASE_TRY_AGAIN_LATER,
  PLEASE_ENTER_MEETING_ID,
  PLEASE_ENTER_YOUR_NAME,
} from "../utils/constants";

const JoinRoomContent = (props) => {
  const navigate = useNavigate();
  const { isRoomHost, setIdentityAction, setRoomIdAction } = props;
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleJoinRoom = async () => {
    if (!isRoomHost && !roomIdValue.trim()) {
      setErrorMessage(PLEASE_ENTER_MEETING_ID);
    } else if (!isRoomHost && !nameValue.trim()) {
      setErrorMessage(PLEASE_ENTER_YOUR_NAME);
    } else {
      setIdentityAction(nameValue);
      if (isRoomHost) {
        if (!nameValue.trim()) {
          setErrorMessage(PLEASE_ENTER_YOUR_NAME);
        } else {
          createRoom();
        }
      } else {
        await joinRoom();
      }
    }
  };

  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomIdValue);

    const { roomExists, full } = responseMessage;

    if (roomExists) {
      if (full) {
        setErrorMessage(MEETING_IS_FULL_PLEASE_TRY_AGAIN_LATER);
      } else {
        setRoomIdAction(roomIdValue);
        navigate("/room");
      }
    } else {
      setErrorMessage(MEETING_ID_NOT_FOUND_PLEASE_CHECK_YOUR_MEETING_ID);
    }
  };

  const createRoom = () => {
    navigate("/room");
  };

  return (
    <>
      <JoinRoomInput
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        handleJoinRoom={handleJoinRoom}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsStateToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudio: (onlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsStateToProps
)(JoinRoomContent);
