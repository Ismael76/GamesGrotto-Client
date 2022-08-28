import React from "react";
import PropTypes from "prop-types";
import { collisions } from "./collisions";

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, 50 + i));
}

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
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
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

    //Boundaries Players Cant Move Over
    class Boundary {
      static width = 64;
      static height = 64;

      constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
      }

      draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    const offset = {
      x: -280,
      y: -1250,
    };
    const boundaries = [];

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4071) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

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
        x: offset.x,
        y: offset.y,
      },
      image: gameScene,
    });

    function animate() {
      window.requestAnimationFrame(animate);
      gameSceneLayer.draw(); // Draw Game Scene Layer
      boundaries.forEach((boundary) => {
        boundary.draw();
      });
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
