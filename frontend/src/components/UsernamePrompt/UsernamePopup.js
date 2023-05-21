import React from 'react';
import './UsernamePopup.scss';
import Form from './Form';


const UsernamePopup = function(props) {
  return (
    <main>
      <div className="pop-up">
        <div className="pop-up-box">
          <div className="border-within">
            <h1 className="neonText"> Welcome to QueueBall!</h1>
            </div>
          <span className="close-icon" onClick={props.onClose}>x</span>
            <Form 
            onClose={props.onClose}
            />
        </div>
      </div>
    </main>
  );
};

export default UsernamePopup;