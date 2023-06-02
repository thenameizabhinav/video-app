import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import { connectWithSocketIOServer } from "./utils/wss";

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/join-room" element=<JoinRoomPage />></Route>
          <Route path="/room" element=<RoomPage />></Route>
          <Route path="/" element=<IntroductionPage />></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
