import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css components/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios").default;

function Login() {
  const [show, setShow] = useState(true);
  const [isClickDN, setIsClickDN] = useState(true);
  const [isClickDK, setIsClickDK] = useState(false);
  const [alert, setAlert] = useState("");
  const [loginAlert, setLoginAlert] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    name: "",
    telephone: "",
    email: "",
  });
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLogin(true);
    }
  }, []);

  const registerForm = (e) => {
    e.preventDefault();
    if (registerInfo.password !== rePassword) {
      alert("Khong trung pass");
    } else {
      axios
        .post("http://localhost:3000/api/v1/auth/register", registerInfo)
        .then((res) => {
          console.log(res);
          setAlert(res.data.msg);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          setAlert(err.response.data.msg);
        });
    }
  };

  const loginForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/auth/login", loginInfo)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("role", res.data.user.role);
        setIsLogin(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoginAlert(err.response.data.msg);
      });
  };

  if (isLogin) {
    if (localStorage.getItem("role") === "admin") {
      return (
        <a href="/admin" style={{ textDecoration: "none" }}>
          <h2 className="success">ĐĂNG NHẬP THÀNH CÔNG. VÀO TRANG QUẢN LÝ</h2>
        </a>
      );
    } else {
      return (
        <a href="/" style={{ textDecoration: "none" }}>
          <h2 className="success">ĐĂNG NHẬP THÀNH CÔNG. VỀ LẠI TRANG CHỦ</h2>
        </a>
      );
    }
  } else {
    return (
      <div className="register">
        <div class="row">
          <div className="col-md-3 register-left">
            <img
              src="https://agelocer.vn/wp-content/uploads/2021/11/dong-ho-nam-agelocer-astronomer-series-6401f2-400x533.png"
              alt=""
            />
            <h3>Welcome to TimmerMan</h3>
            <p>The Home for the stylish!</p>
          </div>

          <div className="col-md-9 register-right">
            <ul
              className="nav nav-tabs nav-justified"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                {isClickDN ? (
                  <div
                    className="nav-link active"
                    onClick={() => setShow(true)}
                  >
                    Đăng nhập
                  </div>
                ) : (
                  <div
                    className="nav-link"
                    onClick={() => {
                      setShow(true);
                      setIsClickDN(true);
                      setIsClickDK(false);
                    }}
                  >
                    Đăng nhập
                  </div>
                )}
              </li>
              <li className="nav-item">
                {isClickDK ? (
                  <div
                    className="nav-link active"
                    onClick={() => setShow(false)}
                  >
                    Đăng ký
                  </div>
                ) : (
                  <div
                    className="nav-link"
                    onClick={() => {
                      setShow(false);
                      setIsClickDN(false);
                      setIsClickDK(true);
                    }}
                  >
                    Đăng ký
                  </div>
                )}
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              {show ? (
                //    LOGIN
                <div className="tab-pane fade show active">
                  <form onSubmit={loginForm}>
                    <h3 className="register-heading">ĐĂNG NHẬP</h3>
                    <div className="containerLogin">
                      <label for="uname">
                        <b>Tài khoản</b>
                      </label>
                      <input
                        className="holder"
                        type="text"
                        placeholder="Enter Username"
                        name="uname"
                        onChange={(e) => {
                          setLoginInfo({
                            ...loginInfo,
                            username: e.target.value,
                          });
                        }}
                        required
                      />
                      <p></p>
                      <label for="uname">
                        <b>Mật khẩu</b>
                      </label>
                      &nbsp;&nbsp;
                      <input
                        className="holder"
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        onChange={(e) => {
                          setLoginInfo({
                            ...loginInfo,
                            password: e.target.value,
                          });
                        }}
                        required
                      />
                      <p></p>
                    </div>
                    <input className="check" type="checkbox" name="remember" />{" "}
                    <span className="rmb">Ghi nhớ tài khoản</span>
                    <span className="forgot">Quên mật khẩu?</span>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "red",
                        marginTop: "5px",
                      }}
                    >
                      {loginAlert}
                    </div>
                    <button className="Alert" type="submit" id="Alert">
                      ĐĂNG NHẬP
                    </button>
                  </form>
                </div>
              ) : (
                // REGISTER
                <div className="tab-pane fade show active">
                  <h3 className="register-heading">ĐĂNG KÝ</h3>

                  <form onSubmit={registerForm}>
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tên đăng nhập *"
                            onChange={(e) => {
                              setRegisterInfo({
                                ...registerInfo,
                                username: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Họ và tên *"
                            onChange={(e) => {
                              setRegisterInfo({
                                ...registerInfo,
                                name: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email *"
                            onChange={(e) => {
                              setRegisterInfo({
                                ...registerInfo,
                                email: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu *"
                            onChange={(e) => {
                              setRegisterInfo({
                                ...registerInfo,
                                password: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập lại mật khẩu *"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại *"
                            onChange={(e) => {
                              setRegisterInfo({
                                ...registerInfo,
                                telephone: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                        <button
                          className="AlertRegister"
                          type="submit"
                          id="Alert"
                        >
                          ĐĂNG KÝ
                        </button>
                      </div>
                    </div>
                    <div className="form-alert">{alert}</div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
