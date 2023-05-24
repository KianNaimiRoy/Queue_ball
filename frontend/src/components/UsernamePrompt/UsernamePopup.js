import React from "react";
import "./UsernamePopup.scss";
import Form from "./Form";

const UsernamePopup = function (props) {
  return (
    <main>
      <div className="pop-up">
        <div className="pop-up-box">
          <div className="border-within">
            <h1 className="neonText">
              {" "}
              Welcome to <span className="neonText">QueueBall!</span>
            </h1>
          </div>
          <div className="welcome-message">
            We're excited to introduce a modern way to reserve your spot at the
            pool table without the hassle of hunting for coins or waiting in
            line. All you need to do is simply scan the QR code near your table
            of choice and add yourself to the queue. To get started, enter a
            unique handle below.
          </div>
          {/* <span className="close-icon" onClick={props.onClose}>x</span> */}
          <Form onClose={props.onClose} />
        </div>
      </div>
    </main>
  );
};

export default UsernamePopup;
