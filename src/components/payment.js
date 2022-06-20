import React from "react";
import { Link } from "react-router-dom";
import "./css components/payment.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
const product = require("./data/product.json");

function Payment() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
    <div className="cart">
      <table>
        <tr className="tp">
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Thành giá</th>
        </tr>
        {cartItems.length === 0 ? (
          <div style={{ marginLeft: "20px", padding: "10px" }}>
            Giỏ hàng trống <Link to={"/sanpham"}>Trở về</Link>
          </div>
        ) : (
          cartItems.map((cartItem) => {
            const { product, imageUrl, name, price, qty } = cartItem;
            return (
              <tr key={product} className="trPayment">
                <td>
                  <div className="cart-info">
                    <img src={require(`./images/hot/${imageUrl}`)} alt="" />
                    <div>
                      <p>{name}</p>
                      <span>Price: {price}</span>
                      <br />
                      <div
                        className="removefromcart-button"
                        onClick={() => removeFromCartHandler(product)}
                      >
                        Xóa khỏi giỏ hàng
                      </div>
                    </div>
                  </div>
                </td>
                <td className="bang">
                  <input
                    type={"number"}
                    min={1}
                    value={qty}
                    onChange={(e) => qtyChangeHandler(product, e.target.value)}
                  />
                </td>
                <td>{price}</td>
              </tr>
            );
          })
        )}
      </table>

      <div className="total-price">
        <table>
          <tr>
            <td>Tổng cộng {getCartCount()} sản phẩm</td>
            <td>{getCartTotalPrice()} VND</td>
          </tr>
        </table>
        <Link to={"/"} className="checkout btn" id="Alert">
          Thanh toán
        </Link>
        {/* <script language="javascript">
            var button = document.getElementById("Alert");
            button.onclick = function(){
            alert("You ordered succeed. Your order will be processed as soon as possible!");
            }
		  	</script> */}
      </div>
    </div>
  );
}

export default Payment;
