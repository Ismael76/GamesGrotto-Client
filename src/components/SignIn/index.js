import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GameContext } from "../../ContextProvider";

export default function SignIn({ setWhichModal }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
    offset,
    setOffset,
    leaveDungeon,
    setleaveDungeon,
  ] = useContext(GameContext);

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
      const response = await fetch(
        "https://games-grotto.herokuapp.com/auth/login",
        options
      );
      const { token } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("username", loginData.username);
      setleaveDungeon(false);
      setLeaveForum(false);
      setLeaveShop(false);
      setOffset({
        x: -900,
        y: -1250,
      });
      navigate("/home", { replace: true });
    } catch (err) {
      alert("Username Or Password Is Incorrect");
      console.log(err);
    }
  };

  function goToOther() {
    setWhichModal("register");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="d-flex flex-column text-center align-self-center">
        <h1>Welcome!</h1>
        <p>Please Sign In With Your Details.</p>
        <br />
        <form onSubmit={handleSubmit}>
          <input
          required
            className="mb- bg-dark"
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          ></input>
          <br />
          <input
          required
            className="mb-1 bg-dark"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></input>
          <br />
          <button className="rpgui-button mb-1" type="submit" value="Login">
            Login
          </button>
          <br />
        </form>

        <p className="mt-1">
          Don't Already Have An Account?{" "}
          <button className="bg-success" onClick={goToOther}>
            Sign Up
          </button>
        </p>
      </section>
    </motion.div>
  );
}
