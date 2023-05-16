import React, { useState } from "react";
import Navigation from "./components/Navigation";
import UsernamePrompt from "./components/UsernamePrompt";
import TableList from "./components/TableList";
import useAppData from "./components/hooks/useAppData";
import "./App.scss";

const App = function (props) {
  const { state } = useAppData();
  const [prompt, setPrompt] = useState(true);

  const togglePrompt = () => {
    setPrompt(!prompt);
  };

  return (
    <main className="App">
      <input
        type="button"
        value="Click to Open Prompt"
        onClick={togglePrompt}
      />
      <div>{prompt && <UsernamePrompt onClose={togglePrompt}/>}</div>
      <Navigation />
      <TableList />
    </main>
  );
};

export default App;
