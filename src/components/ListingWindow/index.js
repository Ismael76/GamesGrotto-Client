import React, { useEffect, useContext, useState, useNavigate } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { ListingModal, ContactModal, Pagination } from "../../components";

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
  const [listing, setListing] = useState();

  const [listingData, setListingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();
      setListingData(data);
    }
    fetchData();
  }, []);

  //Gets Current Listings On Page
  const indexOfLastListing = currentPage * postsPerPage;
  const indexOfFirstListing = indexOfLastListing - postsPerPage;

  const saleData = listingData.filter((listing) => listing.type == "Sell");
  const tradeData = listingData.filter((listing) => listing.type == "Trade");

  const currentListingTrade = tradeData.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const currentListingSale = saleData.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const renderListingSale = () =>
    currentListingSale.map((val, key) => (
      <tr key={key} className="border-golden">
        <td className="p-3">{val.title}</td>
        <td className="p-3">{val.description}</td>
        <td className="p-3">£{val.price}</td>
        <td className="p-3">{val.location}</td>

        <button
          className="rpgui-button px-3 mx-3 my-auto py-auto"
          onClick={() => openModal(val)}
        >
          More
        </button>
      </tr>
    ));

  const renderListingTrade = () =>
    currentListingTrade.map((val, key) => (
      <tr key={key} className="border-golden">
        <td className="p-3">{val.title}</td>
        <td className="p-3">{val.description}</td>
        <td className="p-3">£{val.price}</td>
        <td className="p-3">{val.location}</td>

        <button
          className="rpgui-button px-3 mx-3 my-auto py-auto"
          onClick={() => openModal(val)}
        >
          More
        </button>
      </tr>
    ));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {listingType == "Sell"
                ? renderListingSale()
                : renderListingTrade()}

              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={
                  listingType == "Sell" ? saleData.length : tradeData.length
                }
                paginate={paginate}
              />
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
