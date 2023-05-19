import Actions from "./action";

const initState = {
  roomId: "",
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  showOverlay: true,
  participants: [],
  messages: [],
  chatSection: false,
  participantSection: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost,
      };
    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.onlyWithAudio,
      };
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      };
    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.showOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    case Actions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case Actions.SET_CHAT_SECTION:
      return {
        ...state,
        chatSection: action.chatSection,
      };
    case Actions.SET_PARTICIPANT_SECTION:
      return {
        ...state,
        participantSection: action.participantSection,
      };
    default:
      return state;
  }
};

export default reducer;
