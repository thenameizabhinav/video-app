import { setShowOverlay, setMessages } from "../store/action";
import store from "../store/store";
import * as wss from "./wss";

const SimplePeer = window.SimplePeer;
const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream = null;

async function getMedia(isRoomHost, identity, roomId) {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(defaultConstraints);
    console.log("successfully got the local stream");
    showLocalVideoPreview(localStream);
    store.dispatch(setShowOverlay(false));
    let audioEnabled, videoEnabled;
    isRoomHost
      ? wss.createNewRoom(
          identity,
          (audioEnabled = true),
          (videoEnabled = true)
        )
      : wss.joinRoom(
          identity,
          (audioEnabled = true),
          (videoEnabled = true),
          roomId
        );
  } catch (err) {
    console.log(
      "error occured when trying to get an access to local stream --> ",
      err
    );
  }
}

export const getLocalPreviewandInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  getMedia(isRoomHost, identity, roomId);
};

let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: ["turn:3.108.41.47:3478?transport=udp"],
        username: "josh",
        credential: "password",
      },
      {
        urls: ["turn:3.108.41.47:3478?transport=tcp"],
        username: "josh",
        credential: "password",
      },
    ],
    // iceServers: [
    //   {
    //     urls: "stun:a.relay.metered.ca:80",
    //   },
    //   {
    //     urls: "turn:a.relay.metered.ca:80",
    //     username: "85fc2c24880035c8895a14e4",
    //     credential: "LdV/qDmJZelF2AFw",
    //   },
    //   {
    //     urls: "turn:a.relay.metered.ca:80?transport=tcp",
    //     username: "85fc2c24880035c8895a14e4",
    //     credential: "LdV/qDmJZelF2AFw",
    //   },
    //   {
    //     urls: "turn:a.relay.metered.ca:443",
    //     username: "85fc2c24880035c8895a14e4",
    //     credential: "LdV/qDmJZelF2AFw",
    //   },
    //   {
    //     urls: "turn:a.relay.metered.ca:443?transport=tcp",
    //     username: "85fc2c24880035c8895a14e4",
    //     credential: "LdV/qDmJZelF2AFw",
    //   },
    // ],
  };
};

const messengerChannel = "messenger";

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();
  peers[connUserSocketId] = new SimplePeer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
    channelName: messengerChannel,
  });

  peers[connUserSocketId].on("signal", (data) => {
    //webRTC offer, webRTC answer (SDP information), ice candidates
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  peers[connUserSocketId].on("data", (data) => {
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  });

  peers[connUserSocketId].on("error", (err) => {
    console.log("Error: Something bad happened: ", err);
  });
};

export const handleSignalingData = (data) => {
  // add signaling data to the peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {
  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl.srcObject.getTracks();
    tracks.forEach((t) => t.stop());
    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);
    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

const showLocalVideoPreview = (stream) => {
  //UI
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const labelElement = document.createElement("label");
  labelElement.classList.add("title_label");
  labelElement.innerText = "You";
  const videoElement = document.createElement("video");
  videoElement.classList.add("video_element");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(labelElement);
  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
  //display incoming stream
  console.log(stream);
  const userList = store.getState().participants;
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.classList.add("video_element");
  const labelElement = document.createElement("label");
  labelElement.classList.add("title_label");
  const nameArray = userList.filter(
    (user) => user.socketId === connUserSocketId
  );
  labelElement.innerText = nameArray[0].identity;
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  // videoElement.addEventListener("click", () => {
  //   if (videoElement.classList.contains("full_screen")) {
  //     videoElement.classList.remove("full_screen");
  //   } else {
  //     videoElement.classList.add("full_screen");
  //   }
  // });

  videoContainer.appendChild(labelElement);
  videoContainer.appendChild(videoElement);
  videoContainer.style.position = "static";
  videosContainer.appendChild(videoContainer);
};

// buttons logic

export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
  wss.userMediaUpdate(localStream.getAudioTracks()[0].enabled, null);
};

export const toggleCamera = (isDisabled) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
  wss.userMediaUpdate(null, localStream.getVideoTracks()[0].enabled);
};

export const toggleScreenShare = (
  isScreenSharingActive,
  screenSharingStream = null
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};

const appendNewMessage = (messageData) => {
  const messages = store.getState().messages;
  store.dispatch(setMessages([...messages, messageData]));
};

export const sendMessageUsingDataChannel = (messageContent) => {
  const identity = store.getState().identity;
  const chatTime = formatAMPM(new Date());
  const localMessageData = {
    content: messageContent,
    identity,
    messageCreatedByMe: true,
    chatTime,
  };
  appendNewMessage(localMessageData);
  const messageData = {
    content: messageContent,
    identity,
    chatTime,
  };
  const stringifiedMessageData = JSON.stringify(messageData);
  for (let socketId in peers) {
    peers[socketId].send(stringifiedMessageData);
  }
};

const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
