import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./Dashboard";
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
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
