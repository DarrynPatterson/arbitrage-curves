import { GET_SPOT_PRICES } from "../actions/types";

const initialState = {
  spotPrices: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_PRICES:
      return {
        ...state,
        spotPrices: action.payload
      };
    default:
      return state;
  }
};
