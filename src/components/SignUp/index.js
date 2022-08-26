import React, {useState, useEffect, useCallback} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context"
import * as api from "../../api"

Modal.setAppElement('#root');

export default function SignUp({setWhichModal}) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [registered, setRegistered] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  function goToOther() {
    setWhichModal('login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match.");
      return;
    }

    setLoading(true)
    const res = await api.register({ username, email, password });
    setRegistered(res.verified);
    setErrorMessage(res.error || null);
    setLoading(false);

  }

  const verifyUser = useCallback(async () => {
    setLoading(true)
    const res = await api.login({ username, password });
    setErrorMessage(res.error || null);
    setUser(res.token || null);
  }, [username, password, setUser]);

  useEffect(() => {
    if (registered) {
      verifyUser();
    }
  }, [registered, verifyUser])

  useEffect(() => {
    if (registered && user.username) {
      navigate("/home");
    }
  }, [user, registered, navigate])
  
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
        <br/><button>Submit</button>

      </form>

      <p>
        Already registered? <button onClick={goToOther}>Login</button>
      </p>
    </section>
  );
}
