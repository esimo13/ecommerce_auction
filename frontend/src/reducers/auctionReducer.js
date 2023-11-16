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
  NEW_AUCTION_RESET,
  UPDATE_AUCTION_REQUEST,
  UPDATE_AUCTION_SUCCESS,
  UPDATE_AUCTION_FAIL,
  UPDATE_AUCTION_RESET,
  DELETE_AUCTION_REQUEST,
  DELETE_AUCTION_SUCCESS,
  DELETE_AUCTION_FAIL,
  DELETE_AUCTION_RESET,
  AUCTION_DETAILS_REQUEST,
  AUCTION_DETAILS_FAIL,
  AUCTION_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/auctionConstants";

export const auctionsReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case ALL_AUCTION_REQUEST:
    case ADMIN_AUCTION_REQUEST:
      return {
        loading: true,
        auctions: [],
      };
    case ALL_AUCTION_SUCCESS:
      return {
        loading: false,
        auctions: action.payload.auctions,
        auctionsCount: action.payload.auctionsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredAuctionsCount: action.payload.filteredAuctionsCount,
      };

    case ADMIN_AUCTION_SUCCESS:
      return {
        loading: false,
        auctions: action.payload,
      };
    case ALL_AUCTION_FAIL:
    case ADMIN_AUCTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newAuctionReducer = (state = { auction: {} }, action) => {
  switch (action.type) {
    case NEW_AUCTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_AUCTION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        auction: action.payload.auction,
      };
    case NEW_AUCTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_AUCTION_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const auctionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AUCTION_REQUEST:
    case UPDATE_AUCTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_AUCTION_FAIL:
    case UPDATE_AUCTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_AUCTION_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_AUCTION_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const auctionDetailsReducer = (state = { auction: {} }, action) => {
  switch (action.type) {
    case AUCTION_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case AUCTION_DETAILS_SUCCESS:
      return {
        loading: false,
        auction: action.payload,
      };
    case AUCTION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
