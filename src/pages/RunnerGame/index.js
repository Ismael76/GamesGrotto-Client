import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import kirby from "./kirby.png"
import axios from "axios"

export default function RunnerGame() {
    const [score, setScore] = useState(0)
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
            if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
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
                return data;
            } catch (err) {
                console.log(err);
            }
        }
        navigate("/home", { replace: true });
    }

    function addScore (){
        setScore(prev => prev +1)
        count.current = count.current+1
    }
    useEffect(() => {
        const countDown = setInterval(()=>addScore(), 1000)
        return () => clearInterval(countDown)
    }, [])

    return (
        <section className="gameCanvas">
            <div id="game">
                <div id="character"></div>
                    <div id="block"></div>
                </div>
            <h1 id="score">{score}</h1>
        </section>

    );
}
