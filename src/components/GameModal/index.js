import React, { useState } from "react";
import Modal from "react-modal";
import "./styles.css";

//Modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(64, 223, 219,0)",
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

export default function GameModal({
  modalIsOpen,
  setIsOpen,
  whichModal,
  setWhichModal,
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {whichModal === "shop" ? (
        <Modal
          className="rpgui-content splash-modal-position"
          closeTimeoutMS={500}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Authentication modal"
        >
          <div className="rpgui-container framed-golden-2 d-flex flex-column text-center p-4">
            <button className="position-absolute" onClick={closeModal}>
              X
            </button>
            <div className="mt-2">
              <h1 className="game-modal-heading">PYRE SHOP</h1>
              <p>Enter Shop To Sell, Trade &#38; Buy Games!</p>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          className="rpgui-content splash-modal-position"
          closeTimeoutMS={500}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Authentication modal"
        >
          <div className="rpgui-container framed-golden-2 d-flex flex-column text-center p-4">
            <button className="position-absolute" onClick={closeModal}>
              X
            </button>
            <div className="mt-2">
              <h1 className="game-modal-heading">PYRE COMMUNITY CENTRE</h1>
              <p>
                Enter Building To Communicate With Other Game Lovers Like
                Yourself!
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
