import React, { useState } from "react";
import Button from "../Button";
import addPlayerToLocalStorage from "../../helpers/add_player";
import "./Form.scss";
import "../Button.scss";

const Form = function (props) {
  const [player, setPlayer] = useState(props.player || "");
  const [error, setError] = useState("");

  const validate = function (player) {
    if (player === "") {
      setError("Player name cannot be blank.");
      return;
    }

    addPlayerToLocalStorage(player)
      .then(() => {
        setError("");
        props.onClose();
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response && err.response.status === 400) {
          setError(err.response.data);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <main className="user-handle-form">
      <section className="section-input">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <textarea
            className="player-name-input"
            spellcheck="false"
            name="name"
            type="text"
            value={player}
            placeholder="Enter Your Handle"
            onChange={(event) => {
              setPlayer(event.target.value);
            }}
          ></textarea>
        </form>
      </section>
      <section className="user-handle-validation">{error}</section>

      <section className="rackem">
        <Button rackem onClick={() => validate(player)}>
          Rack 'Em Up
        </Button>
      </section>
    </main>
  );
};

export default Form;
