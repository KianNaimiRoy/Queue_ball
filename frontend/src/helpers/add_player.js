import axios from "axios";
import { setSession } from "./session_check";

const addPlayerToLocalStorage = function (name) {
  const player = {
    name: name,
    enqueued_at: null,
    is_admin: false,
    table_id: null
  };

  return axios
    .post(`http://192.53.120.128:8000/api/players/`, player)
    .then(() => {
      setSession(player);
    });
};

export default addPlayerToLocalStorage;
