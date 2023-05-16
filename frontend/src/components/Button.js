import React from "react";
import classNames from "classnames";


export default function Button(props) {
  let buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--rackem': props.rackem
  });

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
