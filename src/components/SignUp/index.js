import React, { useState, useEffect, useCallback, useContext } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../../ContextProvider";
import * as api from "../../api";

Modal.setAppElement("#root");

export default function SignUp({ setWhichModal }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [registered, setRegistered] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [section, modal, homeSection] = useContext(GameContext);

  const navigate = useNavigate();

  function goToOther() {
    setWhichModal("login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    const loginData = {
      username: e.target[0].value,
      password: e.target[2].value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    };

    const optionsTwo = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/auth/register",
        options
      );

      const loginResponse = await fetch(
        "http://localhost:5000/auth/login",
        optionsTwo
      );

      const { token } = await loginResponse.json();
      localStorage.setItem("token", token);
      fade(section.current);
      fade(modal.current.node);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 800);
    } catch (err) {
      console.log(err);
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match.");
      return;
    }

    setLoading(true);
    const res = await api.register({ username, email, password });
    setRegistered(res.verified);
    setErrorMessage(res.error || null);
    setLoading(false);
  };

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
        <br />
        <input
          type="text"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <input
          type="password"
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <p>
        Already registered? <button onClick={goToOther}>Login</button>
      </p>
    </section>
  );
}
