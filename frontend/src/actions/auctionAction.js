import axios from "axios";

import {
  ALL_AUCTION_FAIL,
  ALL_AUCTION_REQUEST,
  ALL_AUCTION_SUCCESS,
  ADMIN_AUCTION_REQUEST,
  ADMIN_AUCTION_SUCCESS,
  ADMIN_AUCTION_FAIL,
  NEW_AUCTION_REQUEST,
  NEW_AUCTION_SUCCESS,
  NEW_AUCTION_FAIL,
  UPDATE_AUCTION_REQUEST,
  UPDATE_AUCTION_SUCCESS,
  UPDATE_AUCTION_FAIL,
  DELETE_AUCTION_REQUEST,
  DELETE_AUCTION_SUCCESS,
  DELETE_AUCTION_FAIL,
  AUCTION_DETAILS_REQUEST,
  AUCTION_DETAILS_FAIL,
  AUCTION_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/auctionConstants";

// Get All Auctions
export const getAuction =
  (keyword = "", currentPage = 1, price = [0, 25000], category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_AUCTION_REQUEST });

      let link = `/api/v1/auctions?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `/api/v1/auctions?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_AUCTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_AUCTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Auctions For Admin
export const getAdminAuction = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_AUCTION_REQUEST });

    const { data } = await axios.get("/api/v1/admin/auctions");

    dispatch({
      type: ADMIN_AUCTION_SUCCESS,
      payload: data.auctions,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_AUCTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Auction
export const createAuction = (auctionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_AUCTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/auction/new`,
      auctionData,
      config
    );

    dispatch({
      type: NEW_AUCTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_AUCTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Auction
export const updateAuction = (id, auctionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AUCTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/auction/${id}`,
      auctionData,
      config
    );

    dispatch({
      type: UPDATE_AUCTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_AUCTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Auction
export const deleteAuction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_AUCTION_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/auction/${id}`);

    dispatch({
      type: DELETE_AUCTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_AUCTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Auctions Details
export const getAuctionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AUCTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/auction/${id}`);

    dispatch({
      type: AUCTION_DETAILS_SUCCESS,
      payload: data.auction,
    });
  } catch (error) {
    dispatch({
      type: AUCTION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // NEW REVIEW
// export const newReview = (reviewData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_REVIEW_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(`/api/v1/review`, reviewData, config);

//     dispatch({
//       type: NEW_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Get All Reviews of a Auction
// export const getAllReviews = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_REVIEW_REQUEST });

//     const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

//     dispatch({
//       type: ALL_REVIEW_SUCCESS,
//       payload: data.reviews,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete Review of a Auction
// export const deleteReviews = (reviewId, auctionId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_REVIEW_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/reviews?id=${reviewId}&auctionId=${auctionId}`
//     );

//     dispatch({
//       type: DELETE_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
