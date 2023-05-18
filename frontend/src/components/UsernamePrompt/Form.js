import React, { useState } from "react";
import "./Form.scss";
import Button from "../Button";
import "../Button.scss";
import addPlayerToLocalStorage from "../../helpers/add_player";


const Form = function(props) {
  const [player, setPlayer] = useState(props.player || "");
  const [error, setError] = useState("");

  const validate = function(player) {
    if (player === "") {
      setError("Player name cannot be blank");
      return;
    }
    setError("");
    addPlayerToLocalStorage(player);
    props.onClose();
  };


  return (
    <main className="user-handle-form">
      <section className="section-input">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
           <textarea 
           className="player-name-input"
           name="name"
           type="text"
           value={player}
           placeholder="Enter Your Handle"
           onChange={(event) => {
             setPlayer(event.target.value);
           }}></textarea>
        </form>
      </section>
      <section className="user-handle-validation">{error}</section>

      <section className="rackem">
        <Button rackem onClick={() => validate(player)}>Rack 'Em Up</Button>
      </section>
    </main>
  );
};

export default Form;