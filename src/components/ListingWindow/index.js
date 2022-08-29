import React, { useEffect, useContext, useState, useNavigate } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { ListingModal, ContactModal } from "../../components";

import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(64, 223, 219,0.2)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    opacity: "1",
  },
};
Modal.setAppElement("#root");

export default function ListingWindow({ listingType, setShowListing }) {
  const [gameType, setGameType] = useState("Video Game");
  const [section, modal] = useContext(GameContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [whichModal, setWhichModal] = React.useState("ListingModal");
  const [listingData, setListingData] = useState([]);

  const dummyData = [
    {
      name: "Call of Duty",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 12,
      location: "London",
    },
    {
      name: "Fifa 12",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 13,
      location: "London",
    },
    {
      name: "Battlefield 3",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 14,
      location: "London",
    },
    {
      name: "Battlefield 4",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 13,
      location: "London",
    },
    {
      name: "Chess",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 16,
      location: "London",
    },
    {
      name: "Ludo",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 21,
      location: "London",
    },
  ];

  const handleBack = () => {
    setShowListing(false);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function fetchData() {
    const response = await fetch("http://localhost:5000/listings");
    const data = await response.json();
    setListingData(data);
  }

  console.log(listingData);

  useEffect(() => {
    fetchData();
  }, []);

  const renderListing = () =>
    listingData.map((val, key) => (
      <tr key={key} className="border-golden">
        <td className="p-3">{val.title}</td>
        <td className="p-3">{val.description}</td>
        <td className="p-3">£{val.price}</td>
        <td className="p-3">{val.location}</td>

        <button
          className="rpgui-button px-3 mx-3 my-auto py-auto"
          onClick={openModal}
        >
          More
        </button>
      </tr>
    ));

  function goToOther() {
    setWhichModal("ListingModal");
  }

  return (
    <section className="rpgui-content">
      {!modalIsOpen && (
        <div className="rpgui-container framed-golden-2 shop-window">
          <a href="#" onClick={handleBack}>
            <div className="rpgui-container position-absolute">Back</div>
          </a>

          <div className="d-flex flex-column pt-5">
            <select
              className="rpgui-dropdown"
              onChange={(e) => {
                setGameType(e.target.value);
              }}
            >
              <option className="rpgui-dropdown-imp">Video Games</option>
              <option className="rpgui-dropdown-imp">Board Games</option>
            </select>
            <table>
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Price</th>
                <th className="p-3">Location</th>
              </tr>
              {renderListing()}
            </table>
          </div>
        </div>
      )}
      <Modal
        className="rpgui-content splash-modal-position"
        ref={modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Authentication modal"
      >
        <div className="rpgui-container framed d-flex flex-column text-center listing-modal">
          {whichModal == "ContactModal" && (
            <>
              <a className="position-absolute" onClick={goToOther}>
                Back
              </a>
              <ContactModal setWhichModal={setWhichModal} />
            </>
          )}
          {whichModal == "ListingModal" && (
            <>
              <a href="#" onClick={closeModal}>
                <div className="rpgui-container position-absolute">X</div>
              </a>
              <ListingModal setWhichModal={setWhichModal} />
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}
