import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

export default function SignUp() {

  return (


    <section>
      <div>SignUp boyo!</div>
      <p>
        Don't have an account? <Link to="/register">Register.</Link>
      </p>
    </section>
  );
}
