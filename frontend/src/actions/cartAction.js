import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CART_HYDRATE,
} from "../constants/cartConstants";
import axios from "axios";

const LEGACY_CART_KEY = "cartItems";
const LEGACY_SHIPPING_KEY = "shippingInfo";

const getStorageKeys = (state) => {
  const user = state?.user?.user;
  const userId = user?._id || user?.id;
  const scope = userId ? String(userId) : "guest";

  return {
    cartKey: `cartItems:${scope}`,
    shippingKey: `shippingInfo:${scope}`,
  };
};

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const persistCart = (getState) => {
  const state = getState();
  const { cartKey, shippingKey } = getStorageKeys(state);

  localStorage.setItem(cartKey, JSON.stringify(state.cart.cartItems || []));
  localStorage.setItem(
    shippingKey,
    JSON.stringify(state.cart.shippingInfo || {})
  );
};

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  persistCart(getState);
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  persistCart(getState);
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  persistCart(getState);
};

// Hydrate cart from per-user storage (called after login/logout/loadUser)
export const hydrateCart = () => (dispatch, getState) => {
  const state = getState();
  const { cartKey, shippingKey } = getStorageKeys(state);

  // Migration: if scoped keys are empty but legacy keys exist, adopt legacy values once.
  let cartItems = readJSON(cartKey, null);
  let shippingInfo = readJSON(shippingKey, null);

  if (cartItems === null) {
    cartItems = readJSON(LEGACY_CART_KEY, []);
    if (localStorage.getItem(LEGACY_CART_KEY) !== null) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      localStorage.removeItem(LEGACY_CART_KEY);
    }
  }

  if (shippingInfo === null) {
    shippingInfo = readJSON(LEGACY_SHIPPING_KEY, {});
    if (localStorage.getItem(LEGACY_SHIPPING_KEY) !== null) {
      localStorage.setItem(shippingKey, JSON.stringify(shippingInfo));
      localStorage.removeItem(LEGACY_SHIPPING_KEY);
    }
  }

  dispatch({
    type: CART_HYDRATE,
    payload: { cartItems: cartItems || [], shippingInfo: shippingInfo || {} },
  });
};
