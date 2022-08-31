import React, { useEffect } from "react";

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
      `http://localhost:5000/listings/${id}`,
      options
    );
    const data = await response.json();
    setUserListingData(data);
  };

  function renderUserListings() {
    if (userListingData.length != 0) {
      return userListingData.map((val, key) => (
        <tr key={key} className="border-listings-table">
          <td className="p-3 special-border">{val.title}</td>
          <td className="p-3 special-border table-description">
            {val.description}
          </td>
          <td className="p-3 special-border">£{val.price}</td>
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
    return <h1>You Currently Have No Listings To View!</h1>;
  }
  return (
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden shop-window-info">
        <a href="#" onClick={() => setShowUserListings(false)}>
          <div className="rpgui-container flex-item">X</div>
        </a>

        <div className="d-flex flex-column text-center justify-content-center">
          <h1>
            {localStorage.getItem("username").toUpperCase() +
              "'s" +
              " LISTINGS"}
          </h1>
          <table>{renderUserListings()}</table>
        </div>
      </div>
    </section>
  );
}
