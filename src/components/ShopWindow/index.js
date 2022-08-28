
import React from 'react'
import './styles.css'

export default function ShopWindow() {
  return (
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden-2 shop-window">
      <div className="d-flex flex-row-reverse pb-2 pl-2">
        <a href="#" className="">
        <div class="rpgui-icon exclamation"></div>
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
  );



}
