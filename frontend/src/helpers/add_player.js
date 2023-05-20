import axios from "axios";
import { setSession } from "./session_check";

const addPlayerToLocalStorage = function(name) {
  const player = {
    name: name,
    enqueued_at: null,
    is_admin: false,
    table_id: null
  };

  return axios.post(`/api/players/`, player)
    .then(() => {
      setSession(player);
    })
    // .catch(err => {
    //   console.log(err.message, "");
    //   // Handle the error here
    //   // Example: display the error message to the user
    //   if (err.response && err.response.status === 400) {
    //     alert('Error: ' + err.response.data);
    //   }
    // });
};

export default addPlayerToLocalStorage;