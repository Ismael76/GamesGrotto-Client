import React from "react";

export default function ContactModal({ listing, setWhichModal }) {
  function goToOther() {
    setWhichModal("ListingModal");
  }

  const submitContact = async (e) => {
    goToOther();
    e.preventDefault();

    const contactData = {
      seller_username: listing.username,
      listing_title: listing.title,
      name: e.target[0].value,
      mobile_number: e.target[1].value,
      message: e.target[2].value,
      sender_username: localStorage.getItem("username"),
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    };

    try {
      const response = await fetch(
        "https://games-grotto.onrender.com/listings/contact",
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <h1 className="px-5 pt-5">CONTACT</h1>
      <p>Send A Message To The Seller</p>
      <form onSubmit={(e) => submitContact(e)}>
        <div className="p-3">
          <input
            label="Name"
            placeholder="Name"
            maxLength={100}
            type="text"
            id="Input1"
            className="mb-1 bg-dark"
          />
        </div>
        <div className="p-3">
          <input
            label="Tel"
            placeholder="Tel"
            maxLength={100}
            type="text"
            id="Input2"
            className="mb-1 bg-dark"
          />
        </div>
        <div className="p-3">
          <textarea
            id="textarea1"
            rows="5"
            maxLength={500}
            label="Message"
            placeholder="Message"
            className="mb-1 bg-dark"
          ></textarea>
          <button type="submit" className="rpgui-button m-3">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
