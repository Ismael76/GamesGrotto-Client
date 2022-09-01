import React, { useEffect, useState } from "react";
import { SignIn, SignUp } from "../../components";
import backgroundgif from "./world-splash-animation.mp4";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { motion } from "framer-motion";
import "normalize.css";
import "./styles.css";

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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [whichModal, setWhichModal] = React.useState("register");
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/users");
      const data = await response.json();
      setAllUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  function openModal() {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="splash-page rpgui-content ">
        <video preload="auto" autoPlay muted loop id="myVideo">
          <source src={backgroundgif} type="video/mp4" />
        </video>
        <div className="enter-btn-container">
          {!modalIsOpen && (
            <button
              onClick={openModal}
              className="enter-btn shadow-sm rpgui-button my-auto"
            >
              Enter
            </button>
          )}
        </div>

        {!localStorage.getItem("token") && (
          <Modal
            className="rpgui-content splash-modal-position"
            closeTimeoutMS={500}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Authentication modal"
          >
            <div className="rpgui-container framed d-flex flex-column text-center">
              <button className="position-absolute" onClick={closeModal}>
                X
              </button>
              {whichModal === "register" && (
                <SignUp allUsers={allUsers} setWhichModal={setWhichModal} />
              )}
              {whichModal === "login" && (
                <SignIn allUsers={allUsers} setWhichModal={setWhichModal} />
              )}
            </div>
          </Modal>
        )}
      </section>
    </motion.div>
  );
}
