import { SIDEBAR_ITEM_SELECTED } from "../actions/types";

const initialState = {
  selectedItem: "dashboard"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_ITEM_SELECTED:
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
};
