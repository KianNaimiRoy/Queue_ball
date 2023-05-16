import { useState, useEffect } from "react";
import axios from "axios";


const useAppData = function() {
  const [state, setState] = useState({
    name: "",
    enqueued_at: null,
    is_admin: false,
    table_id: null
  });

  useEffect(() => {
    axios.get('/api/players')
      .then(players => {
        console.log("PLAYERS:", players)
      });
  }, []);

  return { state }
};




// const handleSubmit = (event) => {
//   event.preventDefault()

//   return axios.post('/api/players', player)
//     .then((response) => {

//     })
// }


export default useAppData;
