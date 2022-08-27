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
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKeyDown = "";
document.addEventListener("keydown", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKeyDown = "ArrowUp";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKeyDown = "ArrowDown";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKeyDown = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKeyDown = "ArrowRight";
      break;
    case "w":
      keys.w.pressed = true;
      lastKeyDown = "ArrowUp";
      break;
    case "s":
      keys.s.pressed = true;
      lastKeyDown = "ArrowDown";
      break;
    case "a":
      keys.a.pressed = true;
      lastKeyDown = "ArrowLeft";
      break;
    case "d":
      keys.d.pressed = true;
      lastKeyDown = "ArrowRight";
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
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
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
        ctx.drawImage(this.image, this.position.x, this.position.y);
      }
    }
    // Game Scene Configuration
    const gameScene = new Image();
    gameScene.src = require("./map.png");
    const gameSceneLayer = new Sprite({
      position: {
        x: -300,
        y: -1400,
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
      if (
        keys.ArrowDown.pressed ||
        (keys.s.pressed && lastKeyDown === "ArrowDown")
      ) {
        gameSceneLayer.position.y = gameSceneLayer.position.y - 3; // Move Down
      } else if (
        keys.ArrowUp.pressed ||
        (keys.w.pressed && lastKeyDown === "ArrowUp")
      ) {
        gameSceneLayer.position.y = gameSceneLayer.position.y + 3; // Move Up
      } else if (
        keys.ArrowRight.pressed ||
        (keys.d.pressed && lastKeyDown === "ArrowRight")
      ) {
        gameSceneLayer.position.x = gameSceneLayer.position.x - 3; // Move Left
      } else if (
        keys.ArrowLeft.pressed ||
        (keys.a.pressed && lastKeyDown === "ArrowLeft")
      ) {
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
