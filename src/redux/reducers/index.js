import { combineReducers } from "redux";

import auth from "./auth";
import form from "./form";
import forms from "./forms";
import master from "./master";
import viewMode from "./viewMode";
import template from "./template";
import templates from "./templates";
import hierarchy from "./hierarchy";
import templateSelected from "./templateSelected";
import formDetailsSelected from "./formDetailsSelected";

const rootReducer = combineReducers({
  auth,
  form,
  forms,
  master,
  viewMode,
  hierarchy,
  template,
  templates,
  templateSelected,
  formDetailsSelected,
});

export default rootReducer;
