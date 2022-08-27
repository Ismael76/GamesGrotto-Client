import React, { useEffect, useContext } from "react";
import { Dashboard } from "../../components";
import { GameContext } from "../../ContextProvider";

const draw = (context) => {};

export default function Home() {
  const [section, modal, homeSection] = useContext(GameContext);

  function unfade(element) {
    var op = 0.1; // initial opacity
    element.style.display = "block";
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op += op * 0.1;
    }, 40);
  }

  useEffect(() => {
    unfade(homeSection.current);
  }, []);

  return (
    <section ref={homeSection} className="home">
      <Dashboard
        draw={draw}
        height={window.innerHeight}
        width={window.innerWidth}
      />
    </section>
  );
}
