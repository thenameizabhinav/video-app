import axios from "axios";

const IP = window.location.hostname;
const serverApi = `http://${IP}:5002/api`;

export const getRoomExists = async (roomId) => {
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  return response.data;
};
