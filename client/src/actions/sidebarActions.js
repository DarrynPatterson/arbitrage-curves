import { SIDEBAR_ITEM_SELECTED } from "./types";

export const setSelectedItem = selectedItem => dispatch => {
  dispatch({
    type: SIDEBAR_ITEM_SELECTED,
    payload: selectedItem
  });
};
