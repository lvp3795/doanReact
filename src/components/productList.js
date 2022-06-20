import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { Link } from "react-router-dom";
import "./css components/productList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faHeart,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState("");
  const [page, setPage] = useState("page=1");
  const [limit, setLimit] = useState("limit=6");
  const [totalPage, setTotalPage] = useState(0);
  const [priceFilter, setPriceFilter] = useState("sort=price");

  const changePage = (pageNumber) => setPage("page=" + pageNumber);

  let queryObject = [];
  queryObject.push(gender, company, priceFilter, page, limit);

  const url = "http://localhost:3000/api/v1/products/?" + queryObject.join("&");

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data.products);
        setTotalPage(res.data.totalPage);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <section className="section products">
      <div className="products-layout container">
        <div className="col-1-of-4">
          <div>
            <div className="block-title">
              <h3>Giới tính</h3>
            </div>

            <ul className="block-content">
              <li>
                <input
                  type="radio"
                  name="gender"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setGender("gender=Nam");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="" className="brand-name">
                  <span className="brand-name">Nam</span>
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name="gender"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setGender("gender=Nữ");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Nữ</span>
                </label>
              </li>
            </ul>
          </div>

          <div>
            <div className="block-title">
              <h3>Thương hiệu</h3>
            </div>

            <ul className="block-content">
              <li>
                <input
                  type="radio"
                  name="company"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompany("company=Casio");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Casio</span>
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name="company"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompany("company=Citizen");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Citizen</span>
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name="company"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompany("company=Doxa");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Doxa</span>
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name="company"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompany("company=Tissot");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Tissot</span>
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name="company"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompany("company=Seiko");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Seiko</span>
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name="company"
                  id=""
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompany("company=Rolex");
                      setPage("page=1");
                    }
                  }}
                />
                <label for="">
                  <span className="brand-name">Rolex</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-3-of-4">
          <form action="">
            <div className="item">
              <label for="sort-by">
                <b>Sắp xếp</b>
              </label>
              <select name="sort-by" id="sort-by">
                <option value="title" selected="selected">
                  Giá
                </option>
              </select>
            </div>
            <div className="item">
              <label for="order-by">
                <b>Thứ tự</b>
              </label>
              <select
                name="order-by"
                id="sort-by"
                onChange={(e) => {
                  if (e.target.value === "DESC") {
                    setPriceFilter("sort=-price");
                  } else {
                    setPriceFilter("sort=price");
                  }
                }}
              >
                <option value="ASC" selected="selected">
                  Tăng dần
                </option>
                <option value="DESC">Giảm dần</option>
              </select>
            </div>
          </form>

          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="product-layout">
              {data.map((sanpham) => {
                const { _id, picture, name, price } = sanpham;

                return (
                  <div key={_id} className="product">
                    <div className="img-container">
                      <img
                        src={`http://localhost:3000/images/${picture}`}
                        alt={name}
                      />
                      <Link className="add" to={`/chitiet/${_id}`}>
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
                      <div className="bottomName">{name}</div>
                      <div className="price">
                        <span>{price}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CHUYỂN TRANG */}
          <Pagination
            totalPage={totalPage}
            changePage={changePage}
          ></Pagination>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
