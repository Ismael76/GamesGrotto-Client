import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import * as api from "../../api"


export default function SignIn({ setWhichModal }) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
        <br/><button>Submit</button>
      </form>

      <p>
        Don't have an account? <button onClick={goToOther}>Register.</button>
      </p>
    </section>
  );
}
