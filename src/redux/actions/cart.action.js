import {
  ADD_TO_CART,
  APPLY_COUPON,
  LOADING,
  REMOVE_FROM_CART,
  CLEAR_CART,
  COUPON_ERROR,
  OPEN_CART,
  CLOSE_CART
} from "./actionTypes";
import { baseUrl } from "../../utils/url";

export const addToCart = (item) => async (dispatch, getState) => {
  await dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
  const {cart} = getState();
  return cart;
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  }
}

export const applyCoupon = (discount) => {
  return {
    type: APPLY_COUPON,
    payload: discount,
  };
};

export const couponError = (error) => {
  return {
    type: COUPON_ERROR,
    payload: error,
  }
}

export const loading = (state) => {
  return {
    type: LOADING,
    payload: state,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}

export const onOpen = () => {
  return {
    type: OPEN_CART
  }
}

export const onClose = () => {
  return {
    type: CLOSE_CART
  }
}

export const verifyCoupon = (code) => async (dispatch) => {
  dispatch(loading(true));
  await fetch(`${baseUrl}/report/discount/${code}?token=gBh7hrVYV1ZU1RZoQRxQ`)
  .then(res => res.json())
  .then(resJson => {
    dispatch(loading(false));
    const { status, data } = resJson;
    if (status === 200) dispatch(applyCoupon(data));
    if (status === 404) dispatch(couponError("This coupon code doesn't exist"))
  })
};
