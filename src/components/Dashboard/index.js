// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./styles.css";
// import "normalize.css";

// export default function Dashboard() {
//   const [backgroundPosX, setBackgroundPosX] = useState(-300);
//   const [backgroundPosY, setBackgroundPosY] = useState(-1400);

//   const [playerPosX, setPlayerPosX] = useState(700);
//   const [playerPosY, setPlayerPosY] = useState(700);

//   const canvasRef = useRef();

//   const keys = {
//     w: {
//       pressed: false,
//     },
//     a: {
//       pressed: false,
//     },
//     s: {
//       pressed: false,
//     },
//     d: {
//       pressed: false,
//     },
//   };

//   //Animation Loop To Move Character
//   const animate = () => {
//     //Calls The Loop Recursively
//     window.requestAnimationFrame(animate);

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     //Background Map
//     let backgroundImg = new Image();
//     backgroundImg.src = require("./map.png");

//     //Player
//     const playerImg = new Image();
//     playerImg.src = require("../../images/playerUp.png");

//     backgroundImg.onload = function () {
//       //Drawing Map Onto Canvas
//       ctx.drawImage(backgroundImg, backgroundPosX, backgroundPosY);
//       //Drawing Initial Player Pos On Map
//       ctx.drawImage(
//         playerImg,
//         0,
//         0,
//         playerImg.width / 4, //Crop X
//         playerImg.height, //Crop Y
//         playerPosX, //Position Of Player On X Axis
//         playerPosY, //Position Of Player On Y Axis
//         playerImg.width / 4,
//         playerImg.height
//       );
//     };

//     if (keys.w.pressed) {
//       setBackgroundPosY(backgroundPosY - 3);
//       console.log(backgroundPosY);
//       ctx.drawImage(backgroundImg, backgroundPosX, backgroundPosY);
//     }
//   };

//   useEffect(() => {
//     animate();
//   }, [backgroundPosX, backgroundPosY, playerPosX, playerPosY]);

//   //Listen For Key Presses To Move Character
//   window.addEventListener("keydown", (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     switch (e.key) {
//       case "w":
//         keys.w.pressed = true;
//         break;
//       case "s":
//         keys.s.pressed = true;
//         break;
//       case "a":
//         keys.a.pressed = true;
//         break;
//       case "d":
//         keys.d.pressed = true;
//         break;
//       case "ArrowUp":
//         console.log("Pressed Up Arrow");
//         break;
//       case "ArrowDown":
//         console.log("Pressed Down Arrow");
//         break;
//       case "ArrowLeft":
//         console.log("Pressed Left Arrow");
//         break;
//       case "ArrowRight":
//         console.log("Pressed Right Arrow");
//         break;
//     }
//   });

//   //Listen For Key Releases
//   window.addEventListener("keyup", (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     switch (e.key) {
//       case "w":
//         keys.w.pressed = false;
//         break;
//       case "s":
//         keys.s.pressed = false;
//         break;
//       case "a":
//         keys.a.pressed = false;
//         break;
//       case "d":
//         keys.d.pressed = false;
//         break;
//       case "ArrowUp":
//         console.log("Pressed Up Arrow");
//         break;
//       case "ArrowDown":
//         console.log("Pressed Down Arrow");
//         break;
//       case "ArrowLeft":
//         console.log("Pressed Left Arrow");
//         break;
//       case "ArrowRight":
//         console.log("Pressed Right Arrow");
//         break;
//     }
//   });

//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   return (
//     <div role="button" tabIndex="0" className="dashboard">
//       <canvas ref={canvasRef} width={width} height={height}></canvas>
//     </div>
//   );
// }

import React from "react";
import PropTypes from "prop-types";
var spriteMiddle = 2;

const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

let lastKeyDown = "";
document.addEventListener("keydown", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKeyDown = "ArrowUp";
      console.log("Walk Up");
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKeyDown = "ArrowDown";
      console.log("Walk Down");
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKeyDown = "ArrowLeft";
      console.log("Walk Left");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKeyDown = "ArrowRight";
      console.log("Walk Right");
      break;
    default:
      break;
  }
});
document.addEventListener("keyup", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      console.log("Walk Up");
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      console.log("Walk Down");
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      console.log("Walk Left");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      console.log("Walk Right");
      break;
    default:
      break;
  }
});

const Dashboard = ({ draw, height, width }) => {
  const canvas = React.useRef();
  React.useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const playerImage = new Image();
    playerImage.src = require("../../images/playerUp.png");
    class Sprite {
      constructor({ position, velocity, image }) {
        this.position = position;
        this.image = image;
      }

      draw() {
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          width,
          height
        );
      }
    }
    // Game Scene Configuration
    const gameScene = new Image();
    gameScene.src = require("./map.png");
    const gameSceneLayer = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: gameScene,
    }); //  End Game Scene Configuration

    function animate() {
      gameSceneLayer.draw(); // Draw Game Scene Layer
      window.requestAnimationFrame(animate);
      ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4, //Crop X
        playerImage.height, //Crop Y
        700, //Position Of Player On X Axis
        700, //Position Of Player On Y Axis
        playerImage.width / 4,
        playerImage.height
      );
      if (keys.ArrowDown.pressed && lastKeyDown === "ArrowDown") {
        gameSceneLayer.position.y = gameSceneLayer.position.y - 3; // Move Down
      } else if (keys.ArrowUp.pressed && lastKeyDown === "ArrowUp") {
        gameSceneLayer.position.y = gameSceneLayer.position.y + 3; // Move Up
      } else if (keys.ArrowRight.pressed && lastKeyDown === "ArrowRight") {
        gameSceneLayer.position.x = gameSceneLayer.position.x - 3; // Move Left
      } else if (keys.ArrowLeft.pressed && lastKeyDown === "ArrowLeft") {
        gameSceneLayer.position.x = gameSceneLayer.position.x + 3; // Move Right
      }
    }

    animate();
  }, [draw, height, width]);

  return <canvas ref={canvas} height={height} width={width} />;
};
Dashboard.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Dashboard;
