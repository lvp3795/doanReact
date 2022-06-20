import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `http://localhost:3000/api/v1/products/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      imageUrl: data.product.picture,
      price: data.product.price,
      countInStock: data.product.stockCount,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
