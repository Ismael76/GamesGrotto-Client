import React, { useState } from "react";
import "./styles.css";

export default function CreateListing({
  setIsOpen,
  closeModal,
  setUserListingData,
}) {
  const [listingData, setListingData] = useState({
    type: "Sell",
    price: "",
    title: "",
    description: "",
    image: "",
    username: localStorage.getItem("username"),
    location: "",
    marketstatus: "pending",
  });

  const submitListing = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    e.target.reset();
    if (listingData.type == "Trade") {
      listingData.price = 0;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listingData),
    };

    try {
      const response = await fetch(
        "https://games-grotto.herokuapp.com/listings/",
        options
      );
      const data = await response.json();
      setUserListingData((prev) => [...prev, listingData]);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="rpgui-content framed-golden sell-window">
      <div className="rpgui-container framed d-flex flex-column text-center">
        <div
          onClick={closeModal}
          className="rpgui-container position-absolute cross"
        >
          X
        </div>
        <section className="d-flex flex-column text-center p-5">
          <h1>CREATE LISTING</h1>
          <p>Sell/Trade Your Old Games!</p>

          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={(e) => submitListing(e)}>
            <input
            required
              className="mb-1 bg-dark"
              type="text"
              label="Item Name"
              // onChange={(e) => setUsername(e.target.value)}
              placeholder="Item Name"
              onChange={(e) =>
                setListingData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <br />

            <select
              onChange={(e) =>
                setListingData((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              className="rpgui-dropdown listing-dropdown mt-1 mb-1"
            >
              <option defaultValue="Sell">Sell</option>
              <option value="Trade">Trade</option>
            </select>

            <br />
            {listingData.type == "Sell" ? (
              <input
                className="mb-1 bg-dark"
                type="text"
                label="Price"
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Price"
                onChange={(e) =>
                  setListingData((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            ) : (
              <input
                className="mb-1 bg-dark"
                type="text"
                label="Price"
                placeholder="Price"
                disabled
              />
            )}

            <br />
            <input
            required
              className="mb-1 bg-dark"
              type="text"
              label="Location"
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Location"
              onChange={(e) =>
                setListingData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
            <input
              className="mb-1 bg-dark"
              type="text"
              label="Img URL"
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Img URL"
              onChange={(e) =>
                setListingData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />

            <br />
            <textarea
            required
              className="mb-1 bg-dark"
              type="Description"
              label="Description"
              // onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Description"
              onChange={(e) =>
                setListingData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
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
