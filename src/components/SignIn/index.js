import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from "react-router-dom";


export default function SignIn({setWhichModal}) {

  function goToOther() {
    setWhichModal('register')
  }


  return (
    <section>
      <div>SignIn</div>
      <p>
        Don't have an account? <button onClick={goToOther}>Register.</button>
      </p>
    </section>
  );
}
