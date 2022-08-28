import React from "react";
import "./styles.css";

export default function CreateListing({ closeModal }) {
  return (
    <section className="rpgui-content framed-golden sell-window">
      <div className="rpgui-container framed d-flex flex-column text-center">
        <button className="position-absolute" onClick={closeModal}>
          X
        </button>
        <section className="d-flex flex-column text-center p-5">
          <h1>Create a new listing</h1>
          <p>Sell or trade your old games.</p>

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

             <select className="rpgui-dropdown">
              <option value="Sell" selected>Sell</option>
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
              label="Img url"
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Img url"
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
              Submit
            </button>

            <br />
          </form>
        </section>
      </div>
    </section>
  );
}
