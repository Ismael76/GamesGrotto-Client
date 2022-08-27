import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../../ContextProvider";

export default function SignIn({ setWhichModal }) {
  const [section, modal, homeSection] = useContext(GameContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

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
      fade(section.current);
      fade(modal.current.node);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 800);
    } catch (err) {
      console.log(err);
    }
  };

  function goToOther() {
    setWhichModal("register");
  }

  function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        element.style.display = "none";
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= op * 0.1;
    }, 50);
  }

  window.addEventListener("click", () => {
    console.log(modal.current);
  });

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

        <input type="submit" value="Login"></input>
      </form>

      <p>
        Don't have an account? <button onClick={goToOther}>Register.</button>
      </p>
    </section>
  );
}
