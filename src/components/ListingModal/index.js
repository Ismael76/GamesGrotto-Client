import React from "react";
import "./styles.css";
export default function ListingModal({ setWhichModal, listing }) {
  function goToOther() {
    setWhichModal("ContactModal");
  }


  return (
    <section>
      <h1>LISTING</h1>

      <div className="d-flex flex-column align-items-start">
        <h2>Name: {listing.title}</h2>
        <h2>Price: £{listing.price}</h2>
        <h2>Description:</h2>
        <p>
        {listing.description}
        </p>
        <img
          className="for-sale-img"
          src={listing.image}
        />
        <div className="rpgui-container framed-golden-relative contact-seller-container mt-3">
          <h1 className="mx-auto pt-4">SELLER</h1>
          <hr className="golden" />
          <h2>Username: BillyTheKid</h2>
          <h2>Location: London southbank, UK</h2>

          <button className="rpgui-button" onClick={goToOther}>
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
