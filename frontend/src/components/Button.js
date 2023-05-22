import React from "react";
import classNames from "classnames";


export default function Button(props) {
  let buttonClass = classNames('button', {
    'button--rackem': props.rackem,
    'button--join': props.join,
    'button--leave': props.leave,
  });

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
