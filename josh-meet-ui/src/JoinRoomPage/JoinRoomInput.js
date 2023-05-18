import React from "react";

const Input = ({ placeholder, value, onChangeHandler }) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      className="join_room_input"
      onChange={onChangeHandler}
    />
  );
};
const JoinRoomInput = (props) => {
  const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } =
    props;

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value);
  };

  const handleNameValueChange = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <Input
          placeholder="Enter meeting Id"
          value={roomIdValue}
          onChangeHandler={handleRoomIdValueChange}
        />
      )}
      <Input
        placeholder="Enter your name"
        value={nameValue}
        onChangeHandler={handleNameValueChange}
      />
    </div>
  );
};

export default JoinRoomInput;
