import io from "socket.io-client";
import store from "../store/store";
import { setRoomId, setParticipants } from "../store/action";
import * as webRTCHandler from "./webRTCHandler";

const IP = window.location.hostname;
// const SERVER = `http://${IP}:5002`;
const SERVER = `https://${IP}`;

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER, { path: "/socketio" });

  socket.on("connect", () => {
    console.log("successfully connected with socket io server");
    console.log(socket.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    //inform the user  which just join the room that we have prepared for incoming connection
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) => {
    webRTCHandler.removePeerConnection(data);
  });
};

export const createNewRoom = (identity) => {
  //emit an event to server that we would like to create new room
  const data = {
    identity,
  };
  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId) => {
  //emit an event ti server that we would want to join a room

  const data = {
    roomId,
    identity,
  };

  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};