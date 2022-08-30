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
  const [
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
    offset,
    setOffset,
  ] = useContext(GameContext);
  const [showListing, setShowListing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listingType, setListingType] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showUserListings, setShowUserListings] = useState(false);
  const [userListingData, setUserListingData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.innerText == "BUY") {
      e.target.innerText = "Sell";
    }
    setShowListing(true);
    let listingsToShow = e.target.innerText
    setListingType(listingsToShow);
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
    setOffset({
      x: -150,
      y: -1100,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:5000/listings/${localStorage.getItem("username")}`,
        options
      );
      const data = await response.json();
      setUserListingData(data);
    }
    fetchData();
  }, []);

  const deleteListing = async (e, id) => {
    e.preventDefault();

    const deleteData = {
      username: localStorage.getItem("username"),
    };

    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteData),
    };
    const response = await fetch(
      `http://localhost:5000/listings/${id}`,
      options
    );
    const data = await response.json();
    setUserListingData(data);
  };

  function renderUserListings() {
    if (userListingData.length != 0) {
      return userListingData.map((val, key) => (
        <tr key={key} className="border-listings-table">
          <td className="p-3 special-border">{val.title}</td>
          <td className="p-3 special-border table-description">
            {val.description}
          </td>
          <td className="p-3 special-border">£{val.price}</td>
          <td className="p-3 special-border">{val.location}</td>

          <button
            className="rpgui-button ms-3 px-3 mx-3 my-3 py-auto"
            onClick={(e) => deleteListing(e, val.id)}
          >
            DELETE
          </button>
        </tr>
      ));
    }
    return <h1>EMPTY</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="shop bg-light">
        {showListing ? (
          <div className="listing-window-container">
            <ListingWindow
              listingType={listingType}
              setShowListing={setShowListing}
            />
          </div>
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
                        <a href="#">BUY</a>
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
                      <button
                        className="rpgui-button d-block m-auto"
                        onClick={handleClick}
                      >
                        <a href="#">TRADE</a>
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
                        <a href="#">SELL</a>
                      </button>
                    </h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
                  <div>
                    <div className="rpgui-icon star"></div>
                  </div>
                  <div className="product-content">
                    <h3 className="title mx-md-5 py-1">
                      <button
                        onClick={() => {
                          setShowUserListings(true);
                        }}
                        className="rpgui-button d-block m-auto  "
                      >
                        <a href="#">MY LISTINGS</a>
                      </button>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={modalIsOpen ? "show-modal" : "hide-modal"}>
              <div className="modal-content">
                <CreateListing
                  setIsOpen={setIsOpen}
                  closeModal={closeModal}
                  setUserListingData={setUserListingData}
                />
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

        {showUserListings && (
          <section className="rpgui-content">
            <div className="rpgui-container framed-golden shop-window-info">
              <a href="#" onClick={() => setShowUserListings(false)}>
                <div className="rpgui-container flex-item">X</div>
              </a>

              <div className="d-flex flex-column text-center justify-content-center">
                <h1>
                  {localStorage.getItem("username").toUpperCase() +
                    "'s" +
                    " LISTINGS"}
                </h1>
                <table>{renderUserListings()}</table>
              </div>
            </div>
          </section>
        )}
      </section>
    </motion.div>
  );
}
