import React from 'react'
import './styles.css'
export default function ListingModal({ setWhichModal }) {

  function goToOther() {
    setWhichModal("ContactModal");
  }

  return (
    <section>
    <h1>Listing</h1>

    <div className="d-flex flex-column align-items-start">
    <h2>name: Hockey Set</h2>
    <h2>Price: £12</h2>
    <h2>Description:</h2>
    <p>Hockey set for sale, only 1 year old, still has all the pieces: 2 sticks, 1 ball and a net. and now i'm going to test the length of this modal.
    </p>
  <img className="for-sale-img" src="https://cdn.shopify.com/s/files/1/1197/0242/products/KneeHockeyGoalSet_zoom_1200x1200.jpg?v=1460991985"/>
    <div className="rpgui-container framed-golden contact-seller-container">
    <h1 className="mx-auto pt-4">Seller:</h1>
    <hr className="golden" />
    <h2>Username: BillyTheKid</h2>
    <h2>Location: London southbank, UK</h2>

    <button className="rpgui-button" onClick={goToOther}>Contact the seller</button>
    </div>
    </div>
    </section>
  )
}
