import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./styles.css";
import axios from "axios";

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
  const [scoreData, setScoreData] = useState([]);

  const fetchScores = async () => {
    const url = `http://localhost:5000/scores/`;
    const data = await axios.get(url);
    setScoreData(data.data);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function renderPopup() {
    if (whichModal === "shop") {
      return (
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
              <h1 className="game-modal-heading">SHOP</h1>
              <p>Enter Shop To Sell, Trade &#38; Buy Games!</p>
            </div>
          </div>
        </Modal>
      );
    } else if (whichModal === "dungeon") {
      return (
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
              <h1 className="game-modal-heading">MINIGAME</h1>
              <p>
                Climb down the steps to play an exciting minigame! Score as high
                as you can and make it to the top 10 of the leaderboards!
              </p>
            </div>
          </div>
        </Modal>
      );
    } else if (whichModal === "about") {
      return (
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
              <h1 className="game-modal-heading">ABOUT</h1>
              <p>Created By:</p>
              <div className="about-us">
                <a target="_blank" href="https://github.com/Ismael76">
                  Muhammed Ismael Ali
                </a>
                <a target="_blank" href="https://github.com/eheath30">
                  Elliot Heath
                </a>
                <a target="_blank" href="https://github.com/thilak9">
                  Thilakshan Balasubramaniam
                </a>
                <a target="_blank" href="https://github.com/rameez-khawaja">
                  Rameez Khawaja
                </a>
              </div>
            </div>
          </div>
        </Modal>
      );
    } else if (whichModal === "leaderboard") {
      const renderScores = () =>
        scoreData.map((item) => (
          <>
            <div class="d-flex justify-content-around score-div" key={item.id}>
              <p className="p-3 text-center">
                {item.username}
                {/*on {item.date} */}
              </p>
              <p className="p-3 text-center">{item.score}</p>
            </div>
            <hr className="golden" />
          </>
        ));

      return (
        <Modal
          className="rpgui-content splash-modal-position"
          closeTimeoutMS={500}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Authentication modal"
        >
          <div className="rpgui-container framed-golden d-flex flex-column text-center p-4 score-modal">
            <button className="position-absolute" onClick={closeModal}>
              X
            </button>
            <div className="mt-2">
              <h1 className="game-modal-heading">LEADERBOARDS</h1>
              <hr className="golden" />
              {scoreData.length == 0 && (
                <h1 className="text-center">No highscores yet</h1>
              )}
              {scoreData.length != 0 && renderScores()}
            </div>
          </div>
        </Modal>
      );
    }
  }

  return <>{renderPopup()}</>;
}
