import React from "react";
import { Dashboard, SignIn, SignUp } from "../../components";
import "normalize.css";
import "./styles.css";
import backgroundgif from "./world-splash-animation.mp4";
import { Link, useNavigate } from "react-router-dom";

import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export default function Splash() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [whichModal, setWhichModal] = React.useState("register");

  const navigate = useNavigate();

  function openModal() {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    // will check whether they already have an account, if they do they will be sent to the Dashboard, if they don't the modal will appear.
    <section className="splash-page">
      <video preload="auto" autoPlay muted loop id="myVideo">
        <source src={backgroundgif} type="video/mp4" />
      </video>
      <div className="enter-btn-container">
        <button
          onClick={openModal}
          className="btn btn-light btn-lg position-absolute"
        >
          Enter
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {whichModal == "register" && <SignUp setWhichModal={setWhichModal} />}
        {whichModal == "login" && <SignIn setWhichModal={setWhichModal} />}

        <button onClick={closeModal}>close</button>

        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>

        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>
    </section>
  );
}
