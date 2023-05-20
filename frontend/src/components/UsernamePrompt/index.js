import React from "react";
import UsernamePopup from "./UsernamePopup";
import { sessionCheck } from "../../helpers/session_check";



const UsernamePrompt = function(props) {
  const inSession = sessionCheck()

  return (
    <>
      {!inSession && <UsernamePopup
        onClose={props.onClose}
      />}
    </>
  );
};

export default UsernamePrompt;