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
    console.log('Player added to DB');
    // Perform additional actions if needed
  })
  .catch(err => {
    console.log('Error adding player:', err.message);
    // Handle the error here
    // Example: display the error message to the user
    if (err.response && err.response.status === 400) {
      alert('Error: ' + err.response.data);
    } else {
      alert('An error occurred while adding the player.');
    }
  });
}; 

export default addPlayer