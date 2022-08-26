import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn({ setWhichModal }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    return null
  };


  function goToOther() {
    setWhichModal("register");
  }

  return (
    <section>
      <h1>Welcome!</h1>
      <p>Log in with your username and password.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        ></input>
        <br/>
        <input
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
      </form>

      <p>
        Don't have an account? <button onClick={goToOther}>Register.</button>
      </p>
    </section>
  );
}
