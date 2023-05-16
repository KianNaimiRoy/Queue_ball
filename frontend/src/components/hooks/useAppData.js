import { useState, useEffect } from "react";
import axios from "axios";

const useAppData = function() {
   const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("/api/players")
      .then(response => {
        // console.log('PLAYERS', response.data.players);
        setPlayers({players: response.data.players});
      });
  }, []);
  
  return { players };
};
   
// const handleSubmit = (event) => {
//   event.preventDefault()

//   return axios.post('/api/players', player)
//     .then((response) => {

//     })
// }


export default useAppData;
