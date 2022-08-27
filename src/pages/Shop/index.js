import React, { useEffect, useContext } from "react";
import './styles.css'
import { ShopWindow } from '../../components'
import { GameContext } from "../../ContextProvider";

export default function Shop() {
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
  <section ref={homeSection} className='shop bg-dark'>
    <ShopWindow />
  </section>
    )
}
