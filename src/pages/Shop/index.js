import React, { useEffect, useContext } from "react";
import './styles.css'
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
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden-2 shop-window">
        <div className="d-flex flex-row-reverse justify-content-between pb-2 pl-2">
          <a href="#" className="">
            <div class="rpgui-icon exclamation flex-item"></div>
          </a>
          <a href="#" className="">
            <div class="rpgui-container flex-item">Back</div>
          </a>
        </div>
        <div class="d-flex row justify-content-center pb-5 w-auto">
          <div class="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
            <div>
              <div class="rpgui-icon chest-open"></div>
            </div>
            <div class="product-content">
              <h3 class="title mx-md-5 py-1">
                <button className="rpgui-button d-block m-auto  ">
                  <a href="#">Buy</a>
                </button>
              </h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
            <div>
              <div class="rpgui-icon shield"></div>
            </div>
            <div class="product-content">
              <h3 class="title mx-md-5 py-1">
                <button className="rpgui-button d-block m-auto  ">
                  <a href="#">Trade</a>
                </button>
              </h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 d-flex flex-column pt-3 justify-content-center align-items-center rpgui-container framed-grey shadow mx-3">
            <div>
              <div class="rpgui-icon cash"></div>
            </div>
            <div class="product-content">
              <h3 class="title mx-md-5 py-1">
                <button className="rpgui-button d-block m-auto  ">
                  <a href="#">Sell</a>
                </button>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
    )
}
