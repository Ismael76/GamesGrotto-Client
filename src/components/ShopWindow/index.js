import React from "react";
import "./styles.css";

export default function ShopWindow() {
  return (
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden-2 shop-window">
        <div class="row">
        <div class="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <div>
            <div class="rpgui-icon potion-blue"></div>
              <div class="rpgui-icon potion-red"></div>
              <div class="rpgui-icon potion-green"></div>

            </div>
            <div class="product-content">
              <h3 class="title">
                <a href="#">Buy</a>
              </h3>

            </div>
          </div>
          <div class="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <div>
            <div class="rpgui-icon potion-green"></div>
              <div class="rpgui-icon potion-red"></div>

              <div class="rpgui-icon potion-blue"></div>
            </div>
            <div class="product-content">
              <h3 class="title">
                <a href="#">Trade</a>
              </h3>

            </div>
          </div>
          <div class="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <div>
              <div class="rpgui-icon potion-red"></div>
              <div class="rpgui-icon potion-green"></div>
              <div class="rpgui-icon potion-blue"></div>
            </div>
            <div class="product-content">
              <h3 class="title">
                <a href="#">Create a listing</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
