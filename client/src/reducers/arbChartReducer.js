import { GET_ARB_CHART, ARB_CHART_LOADING } from "../actions/types";

const initialState = {
  items: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARB_CHART:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    case ARB_CHART_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
