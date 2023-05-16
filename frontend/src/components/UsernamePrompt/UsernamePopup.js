import React from 'react';
import './UsernamePopup.scss';
import Form from './Form';



const UsernamePopup = function(props) {
  return (
    <main>
      <div className="pop-up">
        <div className="pop-up-box">
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