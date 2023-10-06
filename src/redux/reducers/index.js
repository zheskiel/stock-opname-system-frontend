import { combineReducers } from "redux";

import auth from "./auth";
import master from "./master";
import template from "./template";
import templates from "./templates";
import viewMode from "./viewMode";

import templateSelected from "./templateSelected";

const rootReducer = combineReducers({
  auth,
  master,
  template,
  templates,
  viewMode,
  templateSelected,
});

export default rootReducer;
