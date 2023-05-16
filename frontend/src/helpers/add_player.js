import axios from "axios";

function randomString() {
  const length = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

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
      //Give your user a cookie
      //setting the cookie
      localStorage.setItem(randomString(), JSON.stringify(player));

      //retrieve cookie, get item from localStorage
      const playerCookie = localStorage.getItem(randomString());

      //parsed stringified object
      const parsedPlayerCookie = JSON.parse(playerCookie);
    })
    .catch(err => {
      console.log('Error adding player:', err.message);
      // Handle the error here to display to the user
      if (err.response && err.response.status === 400) {
        alert('Error: ' + err.response.data);
      } else {
        alert('An error occurred while adding the player.');
      }
    });

  //storing the client-cookie in the browser


};

export default addPlayer;