import React from "react";

export default function ContactModal({ setWhichModal }) {
  function goToOther() {
    setWhichModal("ListingModal");
  }

  return (
    <section>
      <h1 className="px-5 pt-5">CONTACT</h1>
      <p>Send A Message To The Seller</p>
      <form>
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
          <button className="rpgui-button m-3">Send</button>
        </div>
      </form>
    </section>
  );
}
