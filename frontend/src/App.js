import React, { useState } from "react";
import Navigation from "./components/Navigation";
import UsernamePrompt from "./components/UsernamePrompt";
import TableList from "./components/TableList";
import "./App.scss";

const App = function (props) {
  const [prompt, setPrompt] = useState(true);

  const togglePrompt = () => {
    setPrompt(!prompt);
  };

  return (
    <main className="App">

      <div>{prompt && <UsernamePrompt onClose={togglePrompt} />}</div>
      <Navigation />
      <TableList />
    </main>
  );
};

export default App;
