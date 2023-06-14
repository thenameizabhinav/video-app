import React, { useEffect } from "react";
import { connect } from "react-redux";
import ButtonContainer from "./ButtonContainer";
import { setIsRoomHost } from "../store/action";
import "./dashboard.css";

const Dashboard = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <h1>Josh Meet</h1>
        <ButtonContainer />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapActionsToProps)(Dashboard);
