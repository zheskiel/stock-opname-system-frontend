import { SET_FORM_SELECTED, RESET_FORM_SELECTED } from "./types";

export const setFormSelected = (result) => {
  return {
    type: SET_FORM_SELECTED,
    payload: result,
  };
};

export const resetFormSelected = () => {
  return {
    type: RESET_FORM_SELECTED,
  };
};
