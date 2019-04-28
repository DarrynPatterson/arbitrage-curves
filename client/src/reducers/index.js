import { combineReducers } from "redux";
import arbChartReducer from "./arbChartReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import spotPriceReducer from "./spotPriceReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  arbChart: arbChartReducer,
  error: errorReducer,
  auth: authReducer,
  spotPrices: spotPriceReducer,
  sidebar: sidebarReducer
});