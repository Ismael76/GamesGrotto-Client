import React, { useState } from "react";
// import "./styles.css";

export default function CreateListing({ closeModal }) {

  return (
    <section className="rpgui-content framed-golden sell-window">
      <div className="rpgui-container framed d-flex flex-column text-center">
        <a href="#" onClick={closeModal}>
          <div className="rpgui-container position-absolute">X</div>
        </a>
        </div>
    </section>
  );
}
