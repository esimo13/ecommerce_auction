import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  newAuctionReducer,
  auctionDetailsReducer,
  auctionReducer,
  auctionsReducer,
} from "./reducers/auctionReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  auctions: auctionsReducer,
  auctionDetails: auctionDetailsReducer,
  newAuction: newAuctionReducer,
  auction: auctionReducer,
  //product
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    // Cart is scoped per-user (or guest). We don't know the user at store init,
    // so default to the guest scope (and migrate legacy keys if present).
    cartItems: (() => {
      const guestKey = "cartItems:guest";
      const legacyKey = "cartItems";
      try {
        const guest = localStorage.getItem(guestKey);
        if (guest) return JSON.parse(guest);
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          const parsed = JSON.parse(legacy);
          localStorage.setItem(guestKey, JSON.stringify(parsed));
          localStorage.removeItem(legacyKey);
          return parsed;
        }
      } catch (e) {}
      return [];
    })(),
    shippingInfo: (() => {
      const guestKey = "shippingInfo:guest";
      const legacyKey = "shippingInfo";
      try {
        const guest = localStorage.getItem(guestKey);
        if (guest) return JSON.parse(guest);
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          const parsed = JSON.parse(legacy);
          localStorage.setItem(guestKey, JSON.stringify(parsed));
          localStorage.removeItem(legacyKey);
          return parsed;
        }
      } catch (e) {}
      return {};
    })(),
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
