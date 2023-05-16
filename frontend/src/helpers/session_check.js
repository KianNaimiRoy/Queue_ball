//sets random string as cookie name
const setSession = (player) => {
  //setting the user cookie
  localStorage.setItem('player-data', JSON.stringify(player));

  //retrieve cookie, get item from localStorage
  const playerCookie = localStorage.getItem('player-data');

  return playerCookie;
};

//check if cookie exist
const sessionCheck = () => {
  const value = localStorage.getItem('player-data');
  if (value) {
    console.log('Cookie exists', value);
    return true;
  }
  return false;
};


//clears player-data in localStorage
const clearSession = () => {
  const playerInSession = localStorage.getItem('player-data');

  if (playerInSession) {
    localStorage.removeItem('player-data');
  }
  return;
};

module.exports = { sessionCheck, setSession, clearSession };