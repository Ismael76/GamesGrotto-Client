import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { ListingWindow, CreateListing } from "../../components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [leaveShop, setLeaveShop, leaveForum, setLeaveForum] =
    useContext(GameContext);
  const [showListing, setShowListing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listingType, setListingType] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.innerText == "Buy") {
      e.target.innerText = "Sell";
    }
    setShowListing(true);
    setListingType(e.target.innerText);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleInfo() {
    setShowInfo(true);
  }

  function handleBack() {
    navigate("/home", { replace: true });
    setLeaveShop(true);
    setLeaveForum(false);
  }

  useEffect(() => {}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="shop bg-light">
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
                  <div
                    onClick={handleInfo}
                    className="rpgui-icon exclamation flex-item"
                  ></div>
                </a>
                <a href="#" onClick={handleBack}>
                  <div className="rpgui-container flex-item">Back</div>
                </a>
              </div>
              <div className="d-flex row justify-content-center pb-5 w-auto">
                <div className="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                  <div>
                    <div className="rpgui-icon chest-open"></div>
                  </div>
                  <div className="product-content">
                    <h3 className="title mx-md-5 py-1">
                      <button
                        className="rpgui-button d-block m-auto"
                        onClick={handleClick}
                      >
                        <a href="#">Buy</a>
                      </button>
                    </h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                  <div>
                    <div className="rpgui-icon shield"></div>
                  </div>
                  <div className="product-content">
                    <h3 className="title mx-md-5 py-1">
                      <button className="rpgui-button d-block m-auto" onClick={handleClick}>
                        <a href="#">
                          Trade
                        </a>
                      </button>
                    </h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                  <div>
                    <div className="rpgui-icon cash"></div>
                  </div>
                  <div className="product-content">
                    <h3 className="title mx-md-5 py-1">
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
            <div className={modalIsOpen ? "show-modal" : "hide-modal"}>
              <div className="modal-content">
                <CreateListing setIsOpen={setIsOpen} closeModal={closeModal} />
              </div>
            </div>
          </section>
        )}

        {showInfo && (
          <section className="rpgui-content">
            <div className="rpgui-container framed-golden shop-window-info">
              <a href="#" onClick={() => setShowInfo(false)}>
                <div className="rpgui-container flex-item">X</div>
              </a>

              <div className="d-flex flex-column text-center justify-content-center">
                <h1 className="mx-auto pe-2 py-2">Welcome to Pyre shop</h1>
                <p>
                  In this shop you can find games of all types to buy or trade.
                </p>
                <p>
                  Alternatively you can post games for sale or to trade on the
                  market place.
                </p>
                <h3>How to:</h3>
                <p>
                  If a game interests you, simply message the seller your offer
                  along with your contact details and wait for a reply.
                </p>
                <div className="rpgui-container framed-grey">
                  <h2>Rules:</h2>
                  <ul className="list-unstyled pe-4">
                    <li>1. Be polite</li>
                    <br />
                    <li>2. Be civil</li>
                    <br />
                    <li>3. Have fun</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </motion.div>
  );
}
