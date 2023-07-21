import io from "socket.io-client";
import store from "../store/store";
import {
  setRoomId,
  setParticipants,
  setLocalSocketId,
  setRecording,
} from "../store/action";
import * as webRTCHandler from "./webRTCHandler";

const IP = window.location.hostname;
// const SERVER = `http://43.204.75.41:5002`;
//const SERVER = `https://${IP}`;
let socket = null;
let recordingCounter = 0;
let recordingStatus = false;

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

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("reconnect", () => {
    console.log("User reconnected");
  });

  socket.on("reconnect_failed", () => {
    console.log("Failed to reconnect");
  });

  socket.on("mute-local", (data) => {
    const { mutedBy } = data;
    console.log("You have been muted by:" + mutedBy);
    // Click on Mute button.
    document.getElementById("mute-button")?.click();
  });

  socket.on("max-audio-level", (data) => {
    const { socketId, audioLevel } = data;
    let highlightedContainers = document.getElementsByClassName(
      "video_track_container highlight"
    );
    let videoContainer = document.getElementById(socketId);
    if (audioLevel && audioLevel <= -50) {
      if (highlightedContainers) {
        // Remove the highlight.
        for (let i = 0; i < highlightedContainers.length; i++) {
          highlightedContainers.item(i).className = "video_track_container";
        }
      }
    } else {
      highlightedContainers = document.getElementsByClassName(
        "video_track_container highlight"
      );
      if (highlightedContainers && highlightedContainers.length) {
        return;
      }
      if (videoContainer) {
        videoContainer.className = "video_track_container highlight";
      }
      webRTCHandler.restartRecording(socketId);
    }
  });

  socket.on("meeting-recording-toast", (data) => {
    console.log("Got meeting-recording toast: ", data);
    console.log(data);
    store.dispatch(setRecording(data.recordingStatus));
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
    videoEnabled,
  };
  socket.emit("user-media-update", data);
};

export const muteUser = (sessionId, disableAudio) => {
  const data = {
    sessionId,
    disableAudio,
  };
  socket.emit("mute-user", data);
};

export const setAudioLevel = (audioLevel) => {
  const data = {
    audioLevel,
  };
  socket.emit("set-audio-level", data);
};

export const getMaxAudioLevel = () => {
  socket.emit("get-max-audio-level");
};

export const startRecording = (restart) => {
  console.log("Recording start: ");
  if (!restart) {
    ++recordingCounter;
    sendRecordingStatus();
  }
  socket.emit("start-recording", recordingCounter);
};

export const recordData = (recordingData, videoPartCount, data) => {
  console.log("Sending recording data: " + recordingData);
  const newData = {
    ...data,
    recordingData,
    videoPartCount,
    recordingCounter,
  };
  socket.emit("recording-data", newData);
};

export const stopRecording = (data) => {
  const newData = {
    ...data,
    recordingCounter,
  };
  console.log("Recording stop: ");
  socket.emit("stop-recording", newData);
  sendRecordingStatus();
};

export const sendRecordingStatus = () => {
  const isRecordingStatus = store.getState().recording;
  if (isRecordingStatus) {
    socket.emit("meeting-recording-toast", { recordingStatus: true });
  } else if (!isRecordingStatus && recordingCounter !== 0) {
    socket.emit("meeting-recording-toast", { recordingStatus: false });
  }
};
