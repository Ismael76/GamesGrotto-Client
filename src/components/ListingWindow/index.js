import React, { useEffect, useContext, useState, useNavigate } from "react";
import "./styles.css"
import { GameContext } from "../../ContextProvider";


import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(64, 223, 219,0.3)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    opacity: "0.92",
  },
};
Modal.setAppElement("#root");


export default function ListingWindow(listingType) {
  const [gameType, setGameType] = useState("Video Game")
  const [section, modal] = useContext(GameContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dummyData = [
    {name:"Call of Duty", description:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", price:12, location:"London"},
    {name:"Fifa 12", description:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", price:13, location:"London"},
    {name:"Battlefield 3", description:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", price:14, location:"London"},
    {name:"Battlefield 4", description:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", price:13, location:"London"},
    {name:"Chess", description:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", price:16, location:"London"},
    {name:"Ludo", description:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", price:21, location:"London"}
  ]

  // Type will be used when accessing database to differentiate between trades and buys
  console.log("The gametype is: ",gameType)



  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  const showListing = () =>

    dummyData.map((val, key) => (
        <tr key={key}>

          <td className="p-3">{val.name}</td>
          <td className="p-3">{val.description}</td>
          <td className="p-3">£{val.price}</td>
          <td className="p-3">{val.location}</td>

          <button className="rpgui-button mt-5" onClick={openModal}>More</button>
          <hr className="golden"/>

        </tr>

      )
    )


  return (
    <section className="rpgui-content">

      <div className="rpgui-container framed-golden-2 shop-window">
        <div className="d-flex flex-column">
          <select className="rpgui-dropdown" onChange={(e)=>{setGameType(e.target.value)}}>
            <option className="rpgui-dropdown-imp">Video Game</option>
            <option className="rpgui-dropdown-imp">Board Game</option>
          </select>
          <table>
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Location</th>
            </tr>
            {showListing()}
        </table>
          {/* <Listings listingType={listingType}/> */}
        </div>
      </div>
      <Modal
            className="rpgui-content splash-modal-position"
            ref={modal}
            closeTimeoutMS={500}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Authentication modal"
          >
             <div className="rpgui-container framed d-flex flex-column text-center">
        <button className="position-absolute" onClick={closeModal}>X</button>
        <h1>Header</h1>
        </div>
          </Modal>
    </section>
  );
}
