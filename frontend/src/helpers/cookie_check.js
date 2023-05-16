//sets random string as cookie name
const setCookie = (player) => {
  function randomString() {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  }
  //Give your user a cookie
  const cookieName = randomString();
  //setting the cookie
  localStorage.setItem(cookieName, JSON.stringify(player));

  //retrieve cookie, get item from localStorage
  const playerCookie = localStorage.getItem(cookieName);

  return playerCookie;
};

//check if cookie exist
const cookieCheck = (cookieName) => {
  if (localStorage[cookieName]) {
    return true;
  }
  return null;
};

module.exports = { cookieCheck, setCookie };