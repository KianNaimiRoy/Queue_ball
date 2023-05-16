import axios from "axios";

const addPlayer = function(name) {
  const player = {
    name: name,
    enqueued_at: null,
    is_admin: false,
    table_id: null
  };

  return axios.post(`/api/players/`, player)
  .then(() => {
    console.log('Player successfully added to DB')
  });
}; 

export default addPlayer