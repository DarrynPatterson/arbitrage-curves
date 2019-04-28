import { GET_ARB_CHART, ARB_CHART_LOADING } from "../actions/types";

const initialState = {
  items: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARB_CHART:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ARB_CHART_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
