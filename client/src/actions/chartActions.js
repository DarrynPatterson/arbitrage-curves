import axios from "axios";
import { GET_ITEMS, ITEMS_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const getChart = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/chart")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: getSeriesData(res.data)
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

const getSeriesData = data => {
  const series = data.map(r => {
    return [r.dateString, parseInt(r.coinDeskLastPriceUsd)];
  });

  return series;
};
