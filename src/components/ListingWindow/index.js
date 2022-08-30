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
  const [listing, setListing] = useState();

  const handleBack = () => {
    setShowListing(false);
  };

  function openModal(listing) {
    setListing(listing);
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
    listingData
      .filter((listing) => listing.type == listingType)
      .map((val, key) => (
        <tr key={key} className="border-listings-table">
          <td className="p-5 special-border">{val.title}</td>
          <td className="p-5 special-border">{val.description}</td>
          <td className="p-5 special-border">£{val.price}</td>
          <td className="p-5 special-border">{val.location}</td>

          <button
            className="rpgui-button px-3 mx-3 mt-4 my-auto py-auto"
            onClick={() => openModal(val)}
          >
            More
          </button>
        </tr>
      ));

  function goToOther() {
    setWhichModal("ListingModal");
  }

  return (
    <section className="rpgui-content overflow-auto">
      {!modalIsOpen && (
        <div className="rpgui-container framed-golden-2 shop-window2">
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
                <th className="p-4"><h2>Name</h2></th>
                <th className="p-4"><h2>Description</h2></th>
                <th className="p-4"><h2>Price</h2></th>
                <th className="p-4"><h2>Location</h2></th>
                <th className="p-4"><h2>See more</h2></th>
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
              <ContactModal listing={listing} setWhichModal={setWhichModal} />
            </>
          )}
          {whichModal == "ListingModal" && (
            <>
              <a href="#" onClick={closeModal}>
                <div className="rpgui-container position-absolute">X</div>
              </a>
              <ListingModal listing={listing} setWhichModal={setWhichModal} />
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}
