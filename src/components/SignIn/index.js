<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, {useState, useEffect} from "react";
>>>>>>> 8a78dad90c2bfcb29fc4afb4289eef2ae5757675
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import * as api from "../../api"


export default function SignIn({ setWhichModal }) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

<<<<<<< HEAD
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };
    try {
      const response = await fetch("http://localhost:5000/auth/login", options);
      const { token } = await response.json();
      localStorage.setItem("token", token);
      naviagte("/home", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
=======
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.login({ username, password });
    setErrorMessage(res.error || null);
    setLoading(false);
    setUser(res.token);
  };

  useEffect(() => {
    if (user.username) {
      navigate("/home");
    }
  }, [user, navigate]);

>>>>>>> 8a78dad90c2bfcb29fc4afb4289eef2ae5757675

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
        <br />
        <input
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
<<<<<<< HEAD
        <input type="submit" value="Login"></input>
=======
        <br/><button>Submit</button>
>>>>>>> 8a78dad90c2bfcb29fc4afb4289eef2ae5757675
      </form>

      <p>
        Don't have an account? <button onClick={goToOther}>Register.</button>
      </p>
    </section>
  );
}
