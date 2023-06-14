import axios from "axios";

const IP = window.location.hostname;
//const serverApi = `http://${IP}:5002/api/v1`;
const serverApi = `https://${IP}/api/v1`;

export const getRoomExists = async (roomId) => {
  // const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  var response = {};
  try {
    response = await axios.post(`${serverApi}/meeting/validate`, {
      roomId: roomId,
    });
  } catch (err) {
    response.data = { error: err.message };
    console.log(err.message);
  }
  return response.data;
};
