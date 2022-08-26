import React, {useState} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

export default function SignUp({setWhichModal}) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  function goToOther() {
    setWhichModal('login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setErrorMessage("Passwords must match.");
    //   return;
    // }


  }

  return (


    <section>
      <h1>Welcome!</h1>
      <p>Create a new account.</p>

      <form onSubmit={handleSubmit}>
      <input
          type="text"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <br/>
        <input
          type="text"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br/>
        <input
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br/>
        <input
          type="password"
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

      </form>

      <p>
        Already registered? <button onClick={goToOther}>Login</button>
      </p>
    </section>
  );
}
