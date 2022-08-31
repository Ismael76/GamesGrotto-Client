import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios"

export default function RunnerGame() {
    const [score, setScore] = useState(0)
    const [gameLoop, setGameLoop] = useState(true)
    const navigate = useNavigate()
    const count = useRef(0)

    useEffect(() => {


        const dino = document.getElementById("character");
        const cactus = document.getElementById("block");

        function jump() {
            if (dino.classList != "jump") {
                dino.classList.add("jump");

                setTimeout(function () {
                    dino.classList.remove("jump");
                }, 300);
            }
        }

        let isAlive = setInterval(function () {
            // get current dino Y position
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

            // get current cactus X position
            let cactusLeft = parseInt(
                window.getComputedStyle(cactus).getPropertyValue("left")
            );

            // detect collision
            if (cactusLeft < 40 && cactusLeft > 0 && dinoTop > 175) {
                // collision
                cactus.id = ""
                let finalScore = count.current
                updateScore(finalScore)
            }
        }, 10);

        document.addEventListener("keydown", function (event) {
            jump();
        });

    }, []);

    var tID; //we will use this variable to clear the setInterval()
    function animateScript() {
        var position = 48; //start position for the image slicer
        const interval = 100; //100 ms of interval for the setInterval()
        tID = setInterval(() => {
            document.getElementById("character").style.backgroundPosition =
                `-${position}px 0px`;
            //we use the ES6 template literal to insert the variable "position"
            if (position <  144) { position = position + 48; }
            //we increment the position by 256 each time
            else { position = 48; }
            //reset the position to 256px, once position exceeds 1536px
        }
            , interval); //end of setInterval
    }

    async function updateScore(finalScore) {
        console.log(finalScore)
        const data = (await axios.get("http://localhost:5000/scores/")).data
        const scoreNumber = data.length
        if (scoreNumber < 10) {
            const scoreData = { username: localStorage.getItem("username"), score: finalScore }
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(scoreData),
            };
            try {
                const response = await fetch("http://localhost:5000/scores/", options);
                const data = await response.json();
                setGameLoop(false)
                return data;
            } catch (err) {
                console.log(err);
            }
        } else {
            const scoreData = { username: localStorage.getItem("username"), score: finalScore }
            const options = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(scoreData),
            };
            try {
                const response = await fetch("http://localhost:5000/scores/", options);
                const data = await response.json();
                setGameLoop(false)
                return data;
            } catch (err) {
                console.log(err);
            }
        }
        // navigate("/home", { replace: true });
    }

    function addScore() {
        setScore(prev => prev + 1)
        count.current = count.current + 1
    }
    useEffect(() => {
        if (gameLoop == true) {
            const countDown = setInterval(() => addScore(), 2000)
            animateScript()
            return () => clearInterval(countDown)
        } else {
            alert("Game over")
            navigate("/home", { replace: true });
        }

    }, [gameLoop])

    return (
        <div className="gameBackground">
            <section className="gameCanvas">
                <div id="game">
                    <div id="character"></div>
                    <div id="block"></div>
                </div>
                <h1 id="score">{score}</h1>
            </section>
        </div>


    );
}
