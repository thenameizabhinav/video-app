import React, { useEffect } from "react";
import "./IntroductionPage.css";
import ConnectingButtons from "./ConnectingButtons";
import { setIsRoomHost } from "../store/action";
import { connect } from "react-redux";

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <h1>Josh Meet</h1>
        <ConnectingButtons />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapActionsToProps)(IntroductionPage);
