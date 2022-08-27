import React, { useRef, useContext } from "react";
import { GameContext } from "../../ContextProvider";
import { SignIn, SignUp } from "../../components";
import "normalize.css";
import "./styles.css";
import backgroundgif from "./world-splash-animation.mp4";
import { Link, useNavigate } from "react-router-dom";

import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(64, 223, 219,0.3)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    opacity: "0.92",
  },
};
Modal.setAppElement("#root");

export default function Splash() {
  const [section, modal] = useContext(GameContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [whichModal, setWhichModal] = React.useState("register");

  const navigate = useNavigate();

  function openModal() {
    if (localStorage.getItem("token")) {
      fade(section.current);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 800);
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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


  return (
    // will check whether they already have an account, if they do they will be sent to the Dashboard, if they don't the modal will appear.
    <section ref={section} className="splash-page rpgui-content ">
      <video preload="auto" autoPlay muted loop id="myVideo">
        <source src={backgroundgif} type="video/mp4" />
      </video>
      <div className="enter-btn-container">
        {!modalIsOpen && (
          <button onClick={openModal} className="enter-btn shadow-sm rpgui-button my-auto">
            Enter
          </button>
        )}
      </div>

        {!localStorage.getItem("token") &&
      <Modal
        className="rpgui-content splash-modal-position"
        ref={modal}
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Authentication modal"
      >
        <div className="rpgui-container framed d-flex flex-column text-center">
        <button className="position-absolute" onClick={closeModal}>X</button>
        {whichModal == "register" && <SignUp setWhichModal={setWhichModal} />}
        {whichModal == "login" && <SignIn setWhichModal={setWhichModal} />}
        </div>
      </Modal>
      }
    </section>
  );
}
