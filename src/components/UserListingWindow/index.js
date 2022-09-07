import React, { useEffect } from "react";
import "./styles.css";

export default function UserListingWindow({
  userListingData,
  setUserListingData,
  setShowUserListings,
}) {
  const deleteListing = async (e, id) => {
    e.preventDefault();
    console.log(id);

    const deleteData = {
      username: localStorage.getItem("username"),
    };

    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteData),
    };
    const response = await fetch(
      `https://games-grotto.herokuapp.com/listings/${id}`,

      options
    );
    const data = await response.json();
    setUserListingData(data);
  };

  function renderUserListings() {
    if (userListingData.length != 0) {
      return userListingData.map((val, key) => (
        <tr key={key} className="border-listings-table ">
          <td className="p-3 special-border text-uppercase table-highlight ">
            {val.title}
          </td>
          <td className="p-3 special-border table-description">
            {val.description}
          </td>
          <td className="p-3 special-border table-highlight">£{val.price}</td>
          <td className="p-3 special-border">{val.location}</td>

          <button
            className="rpgui-button ms-3 px-3 mx-3 my-3 py-auto"
            onClick={(e) => deleteListing(e, val.id)}
          >
            DELETE
          </button>
        </tr>
      ));
    }
  }
  return (
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden-2 shop-window-info listing-container">
        <div
          onClick={() => setShowUserListings(false)}
          className="rpgui-container flex-item cross"
        >
          X
        </div>

        <div className="d-flex flex-column text-center justify-content-center">
          <h1 className="mb-3">
            {localStorage.getItem("username").toUpperCase() +
              "'s" +
              " LISTINGS"}
          </h1>
          <table className="listing-table">
            <tr>
              <th className="p-2">
                <h2>TITLE</h2>
              </th>
              <th className="p-2">
                <h2>DESCRIPTION</h2>
              </th>
              <th className="p-2">
                <h2>PRICE</h2>
              </th>
              <th className="p-2">
                <h2>LOCATION</h2>
              </th>
            </tr>
            {renderUserListings()}
          </table>
          {userListingData.length == 0 ? (
            <div className="center-no-listing">
              <h1>You Currently Have No Listings To View!</h1>
              <img src="https://www.nicepng.com/png/full/28-288275_cash-cash-pixel-art-png.png"></img>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
