import React, { useEffect, useContext, useState, useNavigate } from "react";
import "./styles.css"

export default function ListingWindow(listingType) {
  const [gameType, setGameType] = useState("Video Game")


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


  const showListing = () => 
    dummyData.map((val, key) => (
        <tr key={key}>
          <td className="p-3">{val.name}</td>
          <td className="p-3">{val.description}</td>
          <td className="p-3">£{val.price}</td>
          <td className="p-3">{val.location}</td>
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
    </section>
  );
}
