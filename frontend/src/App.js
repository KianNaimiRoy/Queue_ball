import React, { useState } from "react";
import UsernamePrompt from "./components/UsernamePrompt";
import Ball from "./components/Ball";
import TableList from "./components/TableList";
import "./App.scss";

const App = function (props) {
  const [prompt, setPrompt] = useState(true);

  const togglePrompt = () => {
    setPrompt(!prompt);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const player = JSON.parse(localStorage.getItem("player-data"));

  return (
    <main className="App">
      <div>{prompt && <UsernamePrompt onClose={togglePrompt} />}</div>
      {player && <Ball />}
      <TableList />
    </main>
  );
};

export default App;
