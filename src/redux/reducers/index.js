import { combineReducers } from "redux";

import auth from "./auth";
import master from "./master";
import template from "./template";
import templates from "./templates";
import viewMode from "./viewMode";

const rootReducer = combineReducers({
  auth,
  master,
  template,
  templates,
  viewMode,
});

export default rootReducer;
