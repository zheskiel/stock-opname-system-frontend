import { combineReducers } from "redux";

import auth from "./auth";
import form from "./form";
import forms from "./forms";
import master from "./master";
import reports from "./reports";
import viewMode from "./viewMode";
import template from "./template";
import templates from "./templates";
import hierarchy from "./hierarchy";
import finalForm from "./finalForm";
import compareWaste from "./waste";
import combinedForms from "./combined";
import stockPosition from "./stockPosition";
import templateSelected from "./templateSelected";
import formDetailsSelected from "./formDetailsSelected";

import testingForms from "./testingForms";
import testingOutlet from "./testingOutlet";
import testingStaffForms from "./testingStaffForms";

const rootReducer = combineReducers({
  auth,
  form,
  forms,
  master,
  reports,
  viewMode,
  hierarchy,
  template,
  templates,
  finalForm,
  templateSelected,
  combinedForms,
  stockPosition,
  compareWaste,
  formDetailsSelected,
  testingForms,
  testingOutlet,
  testingStaffForms,
});

export default rootReducer;
