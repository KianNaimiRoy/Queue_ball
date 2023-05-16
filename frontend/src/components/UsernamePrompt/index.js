import React from "react";
import UsernamePopup from "./UsernamePopup";

const UsernamePrompt = function(props) {

  return (
    <>
      <UsernamePopup 
      onClose={props.onClose}/>
    </>
  );
};

export default UsernamePrompt