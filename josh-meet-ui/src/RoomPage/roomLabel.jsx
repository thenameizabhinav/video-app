import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { MEETING_ID_CLICK_THE_BELOW_ID_TO_COPY } from "../utils/constants";
import "./roomPage.css";

const RoomLabel = ({ roomId }) => {
  const [showToast, setShowToast] = useState(true);

  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast
        show={showToast}
        delay={30000}
        autohide
        onClose={toggleShowToast}
        bg="dark"
      >
        <Toast.Header>
          <strong className="me-auto">
            {MEETING_ID_CLICK_THE_BELOW_ID_TO_COPY}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          <CopyToClipboard text={roomId}>
            <Button variant="dark">{`  ${roomId}`}</Button>
          </CopyToClipboard>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default RoomLabel;
