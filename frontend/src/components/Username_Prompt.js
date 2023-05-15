import { React, useState } from 'react';

function UserPrompt() {
  const [player, setPlayer] = useState('');
//conditional rendering does here
//if cookie sessions = false then prompt with form. else form doesn't render.
const handleSubmit = (event) => {
  event.preventDefault();

  // Create an object with the player data
  const playerData = { name: player, enqueued_at: null, is_admin: false, table_id: null };

  // Send the player data to the server
  fetch('/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playerData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Player added:', data);
      // Handle any additional logic or UI updates
    })
    .catch(error => {
      console.error('Error adding player:', error);
      // Handle any error scenarios
    });
};

return (
  <>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        className="player-name-input"
        name="name"
        type="text"
        value={player}
        placeholder="Enter Your Handle"
        onChange={(event) => {
          setPlayer(event.target.value);
        }}
      />
      <button type="submit">Rack 'em up!</button>
    </form>
  </>
);
}
export default UserPrompt;