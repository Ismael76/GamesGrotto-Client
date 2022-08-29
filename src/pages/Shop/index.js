import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { ListingWindow, CreateListing } from "../../components";

import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

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

export default function Shop() {
  const [
    section,
    modal,
    homeSection,
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
  ] = useContext(GameContext);
  const [showListing, setShowListing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listingType, setListingType] = useState("");

  const navigate = useNavigate();

  // const navigate = useNavigate();

  function unfade(element) {
    var op = 0.1; // initial opacity
    element.style.display = "block";
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op += op * 0.1;
    }, 40);
  }

  const handleClick = (e) => {
    console.log("The value of e is:", e);
    setShowListing(true);
    setListingType(e.target.innerText);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleBack() {
    navigate("/home", { replace: true });
    setLeaveShop(true);
    setLeaveForum(false);
  }

  useEffect(() => {
    unfade(homeSection.current);
  }, []);

  return (
    <section ref={homeSection} className="shop bg-dark">
      {showListing ? (
        <ListingWindow
          listingType={listingType}
          setShowListing={setShowListing}
        />
      ) : (
        <section className="rpgui-content">
          <div className="rpgui-container framed-golden-2 shop-window">
            <div className="d-flex flex-row-reverse justify-content-between pb-2 pl-2">
              <a href="#" className="">
                <div class="rpgui-icon exclamation flex-item"></div>
              </a>
              <a href="#" onClick={handleBack}>
                <div class="rpgui-container flex-item">Back</div>
              </a>
            </div>
            <div class="d-flex row justify-content-center pb-5 w-auto">
              <div class="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                <div>
                  <div class="rpgui-icon chest-open"></div>
                </div>
                <div class="product-content">
                  <h3 class="title mx-md-5 py-1">
                    <button
                      className="rpgui-button d-block m-auto"
                      onClick={handleClick}
                    >
                      <a href="#">Buy</a>
                    </button>
                  </h3>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                <div>
                  <div class="rpgui-icon shield"></div>
                </div>
                <div class="product-content">
                  <h3 class="title mx-md-5 py-1">
                    <button className="rpgui-button d-block m-auto  ">
                      <a href="#" onClick={handleClick}>
                        Trade
                      </a>
                    </button>
                  </h3>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                <div>
                  <div class="rpgui-icon cash"></div>
                </div>
                <div class="product-content">
                  <h3 class="title mx-md-5 py-1">
                    <button
                      onClick={openModal}
                      className="rpgui-button d-block m-auto  "
                    >
                      <a href="#">Sell</a>
                    </button>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <Modal
            className="rpgui-content splash-modal-position"
            ref={modal}
            closeTimeoutMS={500}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Authentication modal"
          >
            <CreateListing closeModal={closeModal} />
          </Modal>
        </section>
      )}
    </section>
  );
}
