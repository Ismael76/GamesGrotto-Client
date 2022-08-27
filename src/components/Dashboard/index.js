import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";
import "normalize.css";

export default function Dashboard() {
  const canvasRef = useRef();

  //Render Player & Map
  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //Background Map
    let backgroundImg = new Image();

    //Player
    const playerImg = new Image();
    playerImg.src = require("../../images/playerUp.png");

    //NEED TO REQUIRE IMAGES IN REACT
    backgroundImg.src = require("./map.png");
    backgroundImg.onload = function () {
      //Drawing Map Onto Canvas
      ctx.drawImage(backgroundImg, -300, -1400);
      //Drawing Initial Player Pos On Map
      ctx.drawImage(
        playerImg,
        0,
        0,
        playerImg.width / 4, //Crop X
        playerImg.height, //Crop Y
        700, //Position Of Player On X Axis
        700, //Position Of Player On Y Axis
        playerImg.width / 4,
        playerImg.height
      );
    };
  };

  // //Animation Loop To Move Character
  // function animate() {
  //   //Calls The Loop Recursively
  //   window.requestAnimationFrame(animate);
  //   console.log(animate);
  // }

  //Listen For Key Presses To Move Character
  window.addEventListener("keydown", (e) => {
    e.stopPropagation();
    e.preventDefault();
    switch (e.key) {
      case "w":
        console.log("Pressed W");
        break;
      case "s":
        console.log("Pressed S");
        break;
      case "a":
        console.log("Pressed A");
        break;
      case "d":
        console.log("Pressed D");
        break;
      case "ArrowUp":
        console.log("Pressed Up Arrow");
        break;
      case "ArrowDown":
        console.log("Pressed Down Arrow");
        break;
      case "ArrowLeft":
        console.log("Pressed Left Arrow");
        break;
      case "ArrowRight":
        console.log("Pressed Right Arrow");
        break;
    }
  });

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    render();
  });

  return (
    <div role="button" tabIndex="0" className="dashboard">
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}
