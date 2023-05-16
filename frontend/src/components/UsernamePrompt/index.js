import React from "react";
import UsernamePopup from "./UsernamePopup";
import TableList from "../TableList";
import { cookieCheck } from "../../helpers/cookie_check";

const UsernamePrompt = function(props) {

  return (
    <>
      <UsernamePopup
        onClose={props.onClose}
      />
    </>
  );
};

export default UsernamePrompt;