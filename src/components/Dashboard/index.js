import React from "react";
import PropTypes from "prop-types";
import { collisions } from "./collisions";

//Array That Stores All Tiles That Is A Collision Tile
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

    //Getting Player Image To Render On Map
    const playerImage = new Image();
    playerImage.src = require("../../images/playerUp.png");

    const playerImageDown = new Image();
    playerImageDown.src = require("../../images/playerDown.png");

    const playerImageRight = new Image();
    playerImageRight.src = require("../../images/playerRight.png");

    const playerImageLeft = new Image();
    playerImageLeft.src = require("../../images/playerLeft.png");

    //Boundaries Class Created To Deal With Boundaries Where Players Cant Move Over
    class Boundary {
      static width = 64;
      static height = 64;

      constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
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

    //Sprite Class Creating Sprites Such As Players, Map etc.
    class Sprite {
      constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };

        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
        this.moving = false;
        this.sprites = sprites;
      }

      draw() {
        ctx.drawImage(
          this.image,
          this.frames.val * this.width,
          0,
          this.image.width / this.frames.max, //Crop X
          this.image.height, //Crop Y
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );

        if (this.moving) {
          if (this.frames.max > 1) this.frames.elapsed++;

          if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
          }
        }
      }
    }

    // Player Configuration
    const player = new Sprite({
      position: {
        x: 700, //Player Pos On X Axis
        y: 700, // Player Pos On Y Axis
      },
      image: playerImage, //Loading Player Image
      frames: {
        max: 4,
      },
      sprites: {
        up: playerImage,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight,
      },
    });

    // Game Scene Configuration
    const gameScene = new Image();
    gameScene.src = require("./map.png");
    const gameSceneLayer = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: gameScene, //Loading Map Image
    });

    const checkCollision = ({ player, boundary }) => {
      return (
        player.position.x + player.width >= boundary.position.x &&
        player.position.x <= boundary.position.x + boundary.width &&
        player.position.y <= boundary.position.y + boundary.height &&
        player.position.y + player.height >= boundary.position.y
      );
    };

    const moveables = [gameSceneLayer, ...boundaries];

    function animate() {
      window.requestAnimationFrame(animate);
      gameSceneLayer.draw(); //Draw Game Map Onto Canvas

      //All Boundaries PLayers Cannot Walk Over
      boundaries.forEach((boundary) => {
        boundary.draw();
      });

      player.draw(); //Draw Player Onto Canvas

      let moving = true;
      player.moving = false;
      // Player Movement When Keys Are Pressed
      if (
        keys.ArrowDown.pressed ||
        (keys.s.pressed && lastKeyDown === "ArrowDown")
      ) {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.y -= 3;
          }); // Move Down
        }
      } else if (
        keys.ArrowUp.pressed ||
        (keys.w.pressed && lastKeyDown === "ArrowUp")
      ) {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.y += 3;
          }); // Move Up
        }
      } else if (
        keys.ArrowRight.pressed ||
        (keys.d.pressed && lastKeyDown === "ArrowRight")
      ) {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.x -= 3;
          }); // Move Left
        }
      } else if (
        keys.ArrowLeft.pressed ||
        (keys.a.pressed && lastKeyDown === "ArrowLeft")
      ) {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.x += 3;
          }); // Move Right
        }
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
