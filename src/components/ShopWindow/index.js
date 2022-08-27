
import React from 'react'
import './styles.css'

export default function ShopWindow() {
  return (
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden-2 shop-window">
        <div class="row p-5 w-auto">
        <div class="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <div>
            <div class="rpgui-icon sword"></div>

            </div>
            <div class="product-content">
              <h3 class="title mx-md-5 py-1">
                <a href="#">Buy</a>
              </h3>

            </div>
          </div>
          <div class="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <div>

              <div class="rpgui-icon shield"></div>
            </div>
            <div class="product-content">
              <h3 class="title mx-md-5 py-1">
                <a href="#">Trade</a>
              </h3>

            </div>
          </div>
          <div class="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-center">
            <div>
              <div class="rpgui-icon cash"></div>
            </div>
            <div class="product-content">
              <h3 class="title mx-md-5 py-1">
                <a href="#">Sell</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );



}
