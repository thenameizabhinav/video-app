import io from "socket.io-client";
import store from "../store/store";
import { setRoomId, setParticipants, setLocalSocketId } from "../store/action";
import * as webRTCHandler from "./webRTCHandler";

const IP = window.location.hostname;
// const SERVER = `http://${IP}:5002`;
const SERVER = `https://${IP}`;
let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER, { path: "/socketio" });

  socket.on("connect", () => {
    console.log("successfully connected with socket io server");
    store.dispatch(setLocalSocketId(socket.id));
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

  socket.on("mute-local", (data) => {
    const { mutedBy } = data;
    console.log("You have been muted by:" + mutedBy);
    // Click on Mute button.
    document.getElementById('mute-button')?.click();
  });

  socket.on("max-audio-level", (data) => {
    const { socketId, audioLevel } = data;
    let highlightedContainers = document.getElementsByClassName('video_track_container highlight');
    let videoContainer = document.getElementById(socketId);
    if (audioLevel && audioLevel <= -50) {
      if (highlightedContainers) {
        // Remove the highlight.
        for (let i = 0; i < highlightedContainers.length; i++) {
          highlightedContainers.item(i).className = 'video_track_container';
        }
      }
    } else {
      highlightedContainers = document.getElementsByClassName('video_track_container highlight');
      if (highlightedContainers && highlightedContainers.length) {
        return;
      }
      if (videoContainer) {
        videoContainer.className = 'video_track_container highlight';
      }
    }
  });
};

export const createNewRoom = (identity, audioEnabled, videoEnabled) => {
  //emit an event to server that we would like to create new room
  const data = {
    identity,
    audioEnabled,
    videoEnabled,
  };
  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, audioEnabled, videoEnabled, roomId) => {
  //emit an event ti server that we would want to join a room

  const data = {
    roomId,
    identity,
    audioEnabled,
    videoEnabled,
  };

  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

export const userMediaUpdate = (audioEnabled, videoEnabled) => {
  let data = {
    audioEnabled,
    videoEnabled
  };
  socket.emit("user-media-update", data);
};

export const muteUser = (sessionId, disableAudio) => {
  const data = {
    sessionId,
    disableAudio
  };
  socket.emit("mute-user", data);
};

export const setAudioLevel = (audioLevel) => {
  const data = {
    audioLevel
  };
  socket.emit("set-audio-level", data);
};

export const getMaxAudioLevel = () => {
  socket.emit("get-max-audio-level");
};