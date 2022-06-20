import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../redux/actions/cartAction";
import "./css components/productDetail.css";
import { useDispatch } from "react-redux";
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
const axios = require("axios").default;
const products = require("./data/product.json");

function ProductDetail({ match, history }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(1);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/api/v1/products/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.scrollTo(0, 120);
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(product._id, value));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="section product-detail">
          <div className="details container">
            <div className="left">
              <div className="contain">
                <div className="main">
                  <img
                    src={`http://localhost:3000/images/${product.picture}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <h1>{product.name}</h1>
              <div className="price">{product.price} VND</div>

              <form className="form">
                <div>
                  Tình trạng:{" "}
                  {product.stockCount > 0
                    ? `Còn hàng ( ${product.stockCount} sản phẩm )`
                    : "Hết hàng"}
                </div>
                <br></br>
                <div>
                  Số lượng:{" "}
                  <input
                    type="number"
                    value={value}
                    min={1}
                    max={product.stockCount}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <br></br>
                <div style={{ marginTop: "15px" }}>
                  {value >= 1 && value <= product.stockCount ? (
                    <button
                      type="submit"
                      className="addCart"
                      onClick={addToCartHandler}
                    >
                      <Link
                        to={"/giohang"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Thêm vào giỏ hàng{" "}
                      </Link>
                    </button>
                  ) : (
                    <button type="submit" className="addCart">
                      Thêm vào giỏ hàng
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* CÁC SẢN PHẨM LIÊN QUAN */}
      {/*<section className="section related-products">
        <div className="title">
          <h2>Related Products</h2>
          <span>Be exclusive, Be Devine, Be yourself</span>
        </div>
        <div className="product-layout container">
          {product.map((sanpham) => {
            const { id, picture, name, price, hot } = sanpham;

            if (hot === true && id <= 7) {
              return <div key={id} classNameName="product">
                <div classNameName="img-container">
                  <img src={require(`./images/hot/${picture}`)} alt="" />
                  <div classNameName="addCart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>

                  <ul classNameName="side-icons">
                    <span><FontAwesomeIcon icon={faSearch} /></span>
                    <span><FontAwesomeIcon icon={faHeart} /></span>
                    <span><FontAwesomeIcon icon={faSlidersH} /></span>
                  </ul>
                </div>
                <div classNameName="bottom">
                  <a>{name}</a>
                  <div classNameName="price">
                    <span>{price}</span>
                  </div>
                </div>
              </div>
            }
          })}
        </div>
        </section>*/}
    </>
  );
}

export default ProductDetail;
