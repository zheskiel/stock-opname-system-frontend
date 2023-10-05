import { FETCH_VIEW_MODE, SET_VIEW_MODE } from "./types";

export const fetchViewMode = () => {
  return {
    type: FETCH_VIEW_MODE,
  };
};

export const setViewMode = (mode) => {
  return {
    type: SET_VIEW_MODE,
    payload: {
      mode,
    },
  };
};
