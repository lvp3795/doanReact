import React from "react";
import { useState, useEffect } from "react";
import "./css components/Body.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const product = require("./data/product.json");

function Body() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/v1/products/?featured=true&&page=1&&limit=4"
      )
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="containerbody">
      <img src={require("./images/banner.jpg")} alt="Banner" width={1263} />

      <section className="section promotion">
        {/* DANH MỤC SẢN PHẨM */}
        <div className="title">
          <h2>THƯƠNG HIỆU NỔI TIẾNG</h2>
          <span>Be exclusive, Be Devine, Be yourself</span>
        </div>

        <div className="promotion-layout container">
          <div className="promotion-item">
            <img src={require("./images/brand/casio.jpg")} alt="" />
            <div className="promotion-content">
              <h3>CASIO</h3>
              <a href="">SHOP NOW</a>
            </div>
          </div>

          <div className="promotion-item">
            <img src={require("./images/brand/citizen.jpg")} alt="" />
            <div className="promotion-content">
              <h3>CITIZEN</h3>
              <a href="">SHOP NOW</a>
            </div>
          </div>

          <div className="promotion-item">
            <img src={require("./images/brand/doxa.jpg")} alt="" />
            <div className="promotion-content">
              <h3>DOXA</h3>
              <a href="">SHOP NOW</a>
            </div>
          </div>

          <div className="promotion-item">
            <img src={require("./images/brand/tissot.jpg")} alt="" />
            <div className="promotion-content">
              <h3>TISSOT</h3>
              <a href="">SHOP NOW</a>
            </div>
          </div>

          <div className="promotion-item">
            <img src={require("./images/brand/seiko.jpg")} alt="" />
            <div className="promotion-content">
              <h3>SEIKO</h3>
              <a href="">SHOP NOW</a>
            </div>
          </div>

          <div className="promotion-item">
            <img src={require("./images/brand/rolex.jpg")} alt="" />
            <div className="promotion-content">
              <h3>ROLEX</h3>
              <a href="">SHOP NOW</a>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section products">
        <div className="title">
          <h2>SẢN PHẨM HOT</h2>
          <span>Matching style and class with luxury and comfort</span>
        </div>
        <div className="product-layout">
          {data.map((sanpham) => {
            const { _id, picture, name, price } = sanpham;

            return (
              <div key={_id} className="product">
                <div className="img-container">
                  <img src={`http://localhost:3000/images/${picture}`} alt="" />
                  <Link to={`/chitiet/${_id}`}>
                    <div className="addCart">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                  </Link>

                  <ul className="side-icons">
                    <span>
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faSlidersH} />
                    </span>
                  </ul>
                </div>
                <div className="bottom">
                  <a href="Chi tiết sản phẩm.html">{name}</a>
                  <div className="price">
                    <span>{price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ADVERT */}
      <section className="section advert">
        <div className="advert-layout container">
          <div className="item ">
            <img src={require("./images/type/formen.png")} alt="" />
            <div className="content left">
              <span>Đẳng cấp phái mạnh</span>
              <h3>FOR MEN</h3>
              <a href="">View Collection</a>
            </div>
          </div>
          <div className="item">
            <img src={require("./images/type/forwomen.png")} alt="" />
            <div className="content  right">
              <span>Sang trọng quý phái</span>
              <h3>FOR WOMEN</h3>
              <a href="">View Collection</a>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      {/* <section className="section brands">
                <div className="title">
                    <h2>Design by Thien</h2>
                    <span>There’s a bit of the West in all of us.</span>
                </div>

                <div className="brand-layout container">
                    <div className="glide" id="glide1">
                        <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                                <li className="glide__slide">
                                    <img src={require("./images/brand1.png")} alt="" />
                                </li>
                                <li className="glide__slide">
                                    <img src={require("./images/brand2.png")} alt="" />
                                </li>
                                <li className="glide__slide">
                                    <img src={require("./images/brand3.png")} alt="" />
                                </li>
                                <li className="glide__slide">
                                    <img src={require("./images/brand4.png")} alt="" />
                                </li>
                                <li className="glide__slide">
                                    <img src={require("./images/brand5.png")} alt="" />
                                </li>
                                <li className="glide__slide">
                                    <img src={require("./images/brand6.png")} alt="" />
                                </li>
                                <li className="glide__slide">
                                    <img src={require("./images/brand7.png")} alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </section> */}
    </div>
  );
}

export default Body;
