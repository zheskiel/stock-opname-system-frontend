import { FETCH_VIEW_MODE, SET_VIEW_MODE } from "../actions/types";

const initialState = {
  mode: "desktop",
};

const viewMode = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW_MODE:
      return { ...state };

    case SET_VIEW_MODE:
      var { mode } = action.payload;

      var newState = {
        mode,
      };

      return { ...state, ...newState };

    default:
      return state;
  }
};

export default viewMode;
