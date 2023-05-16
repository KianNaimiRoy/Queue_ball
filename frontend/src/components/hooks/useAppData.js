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

export default useAppData;
