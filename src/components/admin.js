import React, { useState, useEffect } from "react";
import "./css components/admin.css";
import axios from "axios";

function Admin() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    company: "",
    price: "",
    gender: "",
    picture: "null.jpg",
    stockCount: "",
  });
  const [alert, setAlert] = useState("");
  const [login, setLogin] = useState();
  const [image, setImage] = useState(null);
  const [sanPham, setSanPham] = useState({
    name: "",
    company: "",
    price: "",
    gender: "",
    picture: "",
    stockCount: "",
  });

  const handleFile = (e) => {
    const formData = new FormData();
    formData.append("image-file", e.target.files[0], e.target.files[0].name);
    setImage(formData);
    setSanPham({ ...sanPham, picture: e.target.files[0].name });
  };

  const handleUpload = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3000/api/v1/upload/image", image, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAlert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/products/?limit=100")
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const themSP = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3000/api/v1/products/", sanPham, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.msg || err.message);
      });
  };

  const suaSP = () => {
    const token = localStorage.getItem("token");
    axios
      .patch("http://localhost:3000/api/v1/products/" + product._id, sanPham, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.msg || err.message);
      });
  };

  const xoaSP = () => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://localhost:3000/api/v1/products/" + product._id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.msg || err.message);
      });
  };

  const getProduct = (id) => {
    axios
      .get("http://localhost:3000/api/v1/products/" + id)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {login ? (
        <div className="table-admin">
          <div className="tittle">QUẢN LÝ SẢN PHẨM</div>
          <div className="table-content">
            <div className="admin-left">
              <h1>Danh sách sản phẩm</h1>

              {data.map((ten) => {
                const {
                  _id,
                  name,
                  company,
                  gender,
                  price,
                  stockCount,
                  picture,
                } = ten;
                return (
                  <div
                    key={_id}
                    className="ds"
                    onClick={() => {
                      setSanPham({
                        name,
                        company,
                        gender,
                        price,
                        stockCount,
                        picture,
                      });
                      getProduct(_id);
                    }}
                  >
                    {name}
                  </div>
                );
              })}
            </div>

            <div className="admin-right">
              <h1>Thông tin chi tiết</h1>

              <div className="header-right">
                <div className="detail">
                  <div className="khungpic">
                    <img
                      className="pic"
                      src={`http://localhost:3000/images/${product.picture}`}
                      alt=""
                    />
                  </div>
                  <ul className="detail-chitiet">
                    <li>
                      <b>
                        <u>ID:</u>
                      </b>{" "}
                      {product._id}
                    </li>
                    <li>
                      <b>
                        <u>Thương hiệu:</u>
                      </b>{" "}
                      {product.company}
                    </li>
                    <li>
                      <b>
                        <u>Tên sản phẩm:</u>
                      </b>{" "}
                      {product.name}
                    </li>
                    <li>
                      <b>
                        <u>Giá:</u>
                      </b>{" "}
                      {product.price}
                    </li>
                    <li>
                      <b>
                        <u>Phân loại:</u>
                      </b>{" "}
                      {product.gender}
                    </li>
                    <li>
                      <b>
                        <u>Tồn kho:</u>
                      </b>{" "}
                      {product.stockCount}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bottom-right">
                {/* Màn hình render sửa sản phẩm */}
                <div className="detail-right">
                  <ul className="fix-chitiet">
                    <li>
                      <b>Thương hiệu:</b>
                      <select
                        className="sellect-brand"
                        onChange={(e) => {
                          setSanPham({
                            ...sanPham,
                            company: e.target.value,
                          });
                        }}
                      >
                        <option selected disabled>
                          {product.company || "Chọn thương hiệu"}
                        </option>
                        <option>Casio</option>
                        <option>Citizen</option>
                        <option>Doxa</option>
                        <option>Tissot</option>
                        <option>Seiko</option>
                        <option>Rolex</option>
                      </select>
                    </li>
                    <li>
                      <b>Tên sản phẩm:</b>
                      <input
                        placeholder={product.name}
                        onChange={(e) => {
                          setSanPham({
                            ...sanPham,
                            name: e.target.value,
                          });
                        }}
                      ></input>
                    </li>
                    <li>
                      <b>Giá:</b>
                      <input
                        placeholder={product.price}
                        onChange={(e) => {
                          setSanPham({
                            ...sanPham,
                            price: e.target.value,
                          });
                        }}
                      ></input>
                    </li>
                    <li>
                      <b>Phân loại:</b>
                      <select
                        className="sellect-brand"
                        onChange={(e) => {
                          setSanPham({
                            ...sanPham,
                            gender: e.target.value,
                          });
                        }}
                      >
                        <option selected disabled>
                          {product.gender || "Chọn giới tính"}
                        </option>
                        <option>Nam</option>
                        <option>Nữ</option>
                      </select>
                    </li>
                    <li>
                      <b>Tồn kho:</b>
                      <input
                        placeholder={product.stockCount}
                        onChange={(e) => {
                          setSanPham({
                            ...sanPham,
                            stockCount: e.target.value,
                          });
                        }}
                      ></input>
                    </li>
                    <li>
                      <b>Hình ảnh:</b>
                      <input
                        type={"file"}
                        name="file"
                        onChange={(e) => handleFile(e)}
                      ></input>
                      <button
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          position: "absolute",
                          right: "230px",
                        }}
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="option">
                  <button className="add" onClick={themSP}>
                    Thêm sản phẩm
                  </button>
                  <button className="save" onClick={suaSP}>
                    Lưu lại
                  </button>
                  <button className="del" onClick={xoaSP}>
                    Xóa sản phẩm
                  </button>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "red",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {alert}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", color: "red" }}>
          Vui lòng đăng nhập
        </h1>
      )}
    </>
  );
}

export default Admin;
