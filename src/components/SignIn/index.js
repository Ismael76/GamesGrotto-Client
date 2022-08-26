import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
  return (
    <section>
      <div>SignIn</div>
      <p>
        Already registered? <Link to="/">Log in.</Link>
      </p>
    </section>
  );
}
