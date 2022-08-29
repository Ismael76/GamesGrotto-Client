import React from "react";
import "./styles.css";

export default function CreateListing({ closeModal }) {
  return (
    <section className="rpgui-content framed-golden sell-window">
      <div className="rpgui-container framed d-flex flex-column text-center">
        <a href="#" onClick={closeModal}>
          <div class="rpgui-container position-absolute">X</div>
        </a>
        <section className="d-flex flex-column text-center p-5">
          <h1>CREATE LISTING</h1>
          <p>Sell/Trade Your Old Games!</p>

          {/* <form onSubmit={handleSubmit}> */}
          <form>
            <input
              className="mb-1"
              type="text"
              label="Item Name"
              // onChange={(e) => setUsername(e.target.value)}
              placeholder="Item Name"
            />
            <br />

            <select className="rpgui-dropdown listing-dropdown mt-1 mb-1">
              <option value="Sell" selected>
                Sell
              </option>
              <option value="Trade">Trade</option>
            </select>

            <br />
            <input
              className="mb-1"
              type="text"
              label="Price"
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Price"
            />
            <br />
            <input
              className="mb-1"
              type="text"
              label="Location"
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Location"
            />
            <input
              className="mb-1"
              type="text"
              label="Img URL"
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Img URL"
            />

            <br />
            <textarea
              className="mb-1"
              type="Description"
              label="Description"
              // onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Description"
            />
            <br />
            <button type="submit" className="rpgui-button mb-1">
              Create
            </button>

            <br />
          </form>
        </section>
      </div>
    </section>
  );
}
