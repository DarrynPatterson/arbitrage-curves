import { combineReducers } from "redux";
import chartReducer from "./chartReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import spotPriceReducer from "./spotPriceReducer";

export default combineReducers({
  chart: chartReducer,
  error: errorReducer,
  auth: authReducer,
  spotPrices: spotPriceReducer
});
