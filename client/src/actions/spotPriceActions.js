import axios from "axios";
import { GET_SPOT_PRICES } from "./types";
import { returnErrors } from "./errorActions";

export const getSpotPrices = () => dispatch => {
  axios
    .get("/api/v1/spotprices")
    .then(res =>
      dispatch({
        type: GET_SPOT_PRICES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
