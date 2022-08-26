import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

export default function SignUp({setWhichModal}) {

  function goToOther() {
    setWhichModal('login')
  }


  return (


    <section>
      <div>SignUp boyo!</div>

      <p>
        Already registered? <button onClick={goToOther}>Login</button>
      </p>
    </section>
  );
}
