import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as api from "../../api";
import "./styles.css";

Modal.setAppElement("#root");

export default function SignUp({ setWhichModal }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [registered, setRegistered] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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
        "https://games-grotto.herokuapp.com/auth/register",
        options
      );

      const loginResponse = await fetch(
        "https://games-grotto.herokuapp.com/auth/login",
        optionsTwo
      );

      const { token } = await loginResponse.json();
      localStorage.setItem("token", token);
      localStorage.setItem("username", loginData.username);
      navigate("/home", { replace: true });
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="d-flex flex-column text-center">
        <h1>Welcome!</h1>
        <p>Create a new account.</p>

        <form onSubmit={handleSubmit}>
          <input
            className="mb-1"
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <br />
          <input
            className="mb-1"
            type="text"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <input
            className="mb-1"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <input
            className="mb-1"
            type="password"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <br />
          <button type="submit" className="rpgui-button mb-1">
            Submit
          </button>

          <br />
        </form>

        <p className="mt-1">
          Already registered?{" "}
          <button className="bg-success" onClick={goToOther}>
            Login
          </button>
        </p>
      </section>
    </motion.div>
  );
}
