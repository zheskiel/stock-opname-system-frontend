import { combineReducers } from "redux";

import auth from "./auth";
import master from "./master";

const rootReducer = combineReducers({
  auth,
  master,
});

export default rootReducer;
