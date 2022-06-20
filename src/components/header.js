import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AccountItem from "./data/accountItem";
import { Link } from "react-router-dom";
import "./css components/header.css";
import { useSelector } from "react-redux";
const axios = require("axios").default;

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("null");
  const [value, setValue] = useState("");
  const [login, setLogin] = useState(true);
  const token = localStorage.getItem("token");

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const searchHandler = () => {
    axios
      .get("http://localhost:3000/api/v1/products/?name=" + search)
      .then((res) => {
        console.log(res);
        setSearchResult(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    searchResult([]);
  };

  useEffect(() => {
    if (token === null) {
      setLogin(false);
    }
  }, []);

  return (
    <header className="container">
      <div className="wrapper">
        {/* HEADER-LOGO */}
        <div className="header-white">
          <Link to={"/"}>
            <div className="header-logo">
              <img
                src={require("./img/logo.png")}
                className="logo"
                alt="logo"
                width="150"
                height="150"
              />
            </div>
          </Link>

          {/* SEARCH */}
          <Tippy
            popperOptions={{ strategy: "fixed" }}
            appendTo={document.body}
            interactive
            visible={searchResult.length > 0}
            render={(attrs) => (
              <div className="search-result" tabIndex="-1" {...attrs}>
                {searchResult.length > 0 && (
                  <div className="wrapper-search">
                    <h4
                      className="search-tittle"
                      style={{ textAlign: "center" }}
                    >
                      Kết quả tìm kiếm
                    </h4>
                    {searchResult.map((product) => {
                      return (
                        <AccountItem
                          product={product}
                          key={product._id}
                          handleClick={handleClick}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          >
            <div className="search">
              <input
                className="input-search"
                id="myInput"
                placeholder="Tìm kiếm"
                value={value}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setValue(e.target.value);
                }}
              />

              <span className="search-span"></span>

              <button
                className="search-btn"
                onClick={() => {
                  setValue("");
                  setSearchResult([]);
                  setSearch("null");
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <button className="search-btn">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={searchHandler}
                />
              </button>
            </div>
          </Tippy>

          {/* GIỎ HÀNG */}
          <div className="login">
            <div className="giohang">
              <Link to={"/giohang"} className="cart">
                <div className="icon-container">
                  <FontAwesomeIcon
                    className="giohang-icon"
                    icon={faBagShopping}
                  />
                  <span className="cart_badge">{getCartCount()}</span>
                </div>
              </Link>
            </div>

            {login ? (
              <div className="current-user">
                <span>Xin chào, </span>
                <span className="userName">{localStorage.getItem("name")}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("name");
                    setLogin(false);
                    window.location.reload();
                  }}
                >
                  <FontAwesomeIcon
                    className="logout"
                    title="Log Out"
                    icon={faRightFromBracket}
                  />
                </button>
              </div>
            ) : (
              <div className="action">
                <Link to={"/login"}>
                  <button className="btn-login">Đăng nhập</button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* HEADER-MENU */}
        <div className="header-black">
          <div className="black-wrapper">
            <ul className="black-content">
              <Link to={"/"} className="non-textdecoration">
                <li className="black-li">TRANG CHỦ</li>
              </Link>

              <Link to={"/sanpham"} className="non-textdecoration">
                <li className="black-li">SẢN PHẨM</li>
              </Link>

              <li className="black-li">BLOG</li>
              <li className="black-li">LIÊN HỆ</li>
              <li className="black-li">GIỚI THIỆU</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
