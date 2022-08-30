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
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/listings/contact",
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
          <label for="Input1">Name:</label>
          <input maxLength={100} type="text" id="Input1" />
        </div>
        <div className="p-3">
          <label for="Input2">Tel:</label>
          <input maxLength={100} type="text" id="Input2" />
        </div>
        <div className="p-3">
          <label for="textarea1">Message:</label>
          <textarea id="textarea1" rows="5" maxLength={500}></textarea>
          <button type="submit" className="rpgui-button m-3">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
