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
  let result = [];

  const series1 = data.map(r => {
    return [r.dateString, parseInt(r.coinDeskLastPriceUsd)];
  });
  result.push({ name: "Coin Desk USD", data: series1 });

  const series2 = data.map(r => {
    return [r.dateString, parseInt(r.cexIoLastPriceUsd)];
  });
  result.push({ name: "CEX.IO USD", data: series2 });

  const series3 = data.map(r => {
    return [r.dateString, parseInt(r.krakenLastPriceUsd)];
  });
  result.push({ name: "Kraken USD", data: series3 });

  const series4 = data.map(r => {
    return [r.dateString, parseInt(r.lunoLastPriceUsd)];
  });
  result.push({ name: "Luno USD", data: series4 });

  return result;
};
