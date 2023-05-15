//checks for cookie and returns boolean value
// import { useCookies } from 'react-cookie';

// const playerSession = (req) => {
//   const playerID = req.session.player_id;

//   return playerID ? true : false;
// };
import { getCookie, setCookie } from 'react-use-cookie';

const getPlayer = () => {
  //xsrf prevents cross site forgery
  const xsrfToken = getCookie('XSRF-TOKEN');
  // use to call your API
  
};

const saveLocale = (locale) => {
  setCookie('locale', locale, {
    days: 1,
    domain: 'github.com',
    SameSite: 'Lax',
    Secure: true,
  });
};