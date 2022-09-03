import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";

Modal.setAppElement("#root");

export default function SignUp({ allUsers, setWhichModal }) {
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

    for (let i = 0; i < allUsers.length; i++) {
      if (username == allUsers[i].username) {
        alert("Username Already Exists, Please Use A Different Username");
        return;
      } else if (email == allUsers[i].email) {
        alert("Email Already Exists, Please Use A Different Email");
      }
    }

    if (password == confirmPassword) {
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
    } else if (password !== confirmPassword) {
      alert("Passwords Must Match.");
    }
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
        <p>Create A New Account.</p>

        <form onSubmit={handleSubmit}>
          <input
          required
            className="mb-1 bg-dark"
            type="text"
            minLength={3}
            maxLength={12}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <br />
          <input
          required
            className="mb-1 bg-dark"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <input
          required
            className="mb-1 bg-dark"
            type="password"
            label="Password"
            minLength={8}
            maxLength={30}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <input
          required
            className="mb-1 bg-dark"
            type="password"
            label="Confirm Password"
            minLength={8}
            maxLength={30}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <br />
          <button type="submit" className="rpgui-button mb-1">
            Register
          </button>

          <br />
        </form>

        <p className="mt-1">
          Already Registered?{" "}
          <button className="bg-success" onClick={goToOther}>
            Sign In
          </button>
        </p>
      </section>
    </motion.div>
  );
}
