import { setShowOverlay, setMessages } from "../store/action";
import store from "../store/store";
import * as wss from "./wss";
import hark from "./hark";

const SimplePeer = window.SimplePeer;
const defaultConstraints = {
  audio: true,
  video: true,
};

const audioChunks = [];
let allTracks = {};
let mediaRecorder = null;
let video_count = 0;
let isHost = false;

let localStream = null;
let max_audio_interval = null;

function check_volume_change(localStream) {
  let hark_options = { interval: 250 };
  let audioMonitor = new hark(localStream, hark_options);
  audioMonitor.on("volume_change", function (volume) {
    if (volume == Infinity) {
      return;
    }
    wss.setAudioLevel(volume);
  });
  max_audio_interval = setInterval(() => {
    wss.getMaxAudioLevel();
  }, 500);
}

/**
 * Start video recording.
 * @param {*} socketId: socketId in string format to add the video stream of particular user.
 *
 * -> Notifies the backend that recording has been started
 *
 * -> Merge audio video streams
 *
 * -> Send data to backend.
 */
export function startRecording(socketId = null) {
  // Notify the backend to do the processing before starting the recording.
  wss.startRecording();

  /* Audio Context is being used to merge multiple audio streams.
   * It requires creation of one destination stream on which multiple audio source
   * streams can be attached.
   */
  const audioContext = new AudioContext();
  const dest = audioContext.createMediaStreamDestination();

  Object.keys(allTracks).forEach((key) => {
    var audioStream = audioContext.createMediaStreamSource(allTracks[key]);
    audioStream.connect(dest);
  });

  let mediaStream = new MediaStream();

  // Add audio tracks to media stream
  if (dest) {
    mediaStream.addTrack(dest.stream.getAudioTracks()[0]);
  }

  // By Default, set the video track to first video track
  let videoTrack = allTracks[Object.keys(allTracks)[0]].getVideoTracks()[0];
  // Set the track based on the highlighted user by providing the socketID.
  if (socketId && Object.keys(allTracks).includes(socketId)) {
    videoTrack = allTracks[socketId].getVideoTracks()[0];
  }
  if (videoTrack) {
    mediaStream.addTrack(videoTrack);
  }
  // Add media recorder properties
  const recorderOptions = {
    mimeType: "video/webm; codecs=vp8",
    videoBitsPerSecond: 200000, // 0.2 Mbit/sec.
  };
  mediaRecorder = new MediaRecorder(mediaStream, recorderOptions);
  mediaRecorder.start();
  // Add event handlers for media recorder
  addEventListeners(mediaRecorder);
}

/**
 * Event handlers for Media Recorder
 */
function addEventListeners(mediaRecorder) {
  if (!mediaRecorder) {
    return;
  }

  // dataavailable event is triggered when the media recorder is stopped,
  // or recorder is started with an interval. Currently we are not using the interval.
  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data && event.data.size > 0) {
      audioChunks.push(event.data);
    }
  });

  mediaRecorder.addEventListener("stop", async () => {
    sendData();
  });
}

/**
 * Send the video recording data to the backend.
 */
async function sendData() {
  if (!audioChunks) {
    return;
  }
  if (audioChunks.length == 0) {
    return;
  }
  const audioBlob = new Blob(audioChunks.splice(0, audioChunks.length));
  console.log("Sending now..");
  wss.recordData(audioBlob, video_count);
  video_count += 1;
}

/**
 *
 * @param {*} socketId
 * @returns Nothing
 */
export async function restartRecording(socketId = null) {
  if (!isHost) {
    console.log("I am not host so I will not start recording");
    return;
  }

  const rec = store.getState().recording;
  console.log("Value of recording in restart Recording:", rec);
  if (!rec) {
    return;
  }
  console.log("restarting recording");
  await stopRecording(false);
  console.log("stopped recording");
  startRecording(socketId);
}

/**
 * Stop the recording and send data to backend.
 * @param {*} final
 * It is used to stop the meeting and backend will be notified to perform the merge
 */
export function stopRecording(final) {
  const promise = new Promise((resolve, reject) => {
    if (!isHost) {
      console.log("I am not host so I will not stop recording");
      resolve();
    }
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder = null;
    }
    if (final) {
      sendData();
      setTimeout(() => {
        video_count = 0;
        audioChunks.length = 0;
        wss.stopRecording();
        resolve();
      }, 1000);
    } else {
      resolve();
    }
  });
  return promise;
}

async function getMedia(isRoomHost, identity, roomId) {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(defaultConstraints);
    console.log("successfully got the local stream");
    check_volume_change(localStream);
    let socketId = store.getState().localSocketId;
    allTracks[socketId] = localStream;
    if (isRoomHost) {
      isHost = isRoomHost;
      // setTimeout(() => {
      //   startRecording(null);
      // }, 1000);
    }
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
        urls: ["turn:43.204.75.41:3478?transport=udp"],
        username: "josh",
        credential: "password",
      },
      {
        urls: ["turn:43.204.75.41:3478?transport=tcp"],
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
  const mySocketId = store.getState().localSocketId;
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  videoContainer.id = mySocketId;
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

  // store stream and restart recording
  allTracks[connUserSocketId] = stream;
  if (mediaRecorder) {
    restartRecording(null);
  }

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

export const stop_max_audio = () => {
  if (max_audio_interval) {
    clearInterval(max_audio_interval);
  }
};
