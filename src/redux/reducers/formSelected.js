import { SET_FORM_SELECTED, RESET_FORM_SELECTED } from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const formSelected = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_SELECTED:
      var newState = {
        data: { ...action.payload },
      };

      return { ...state, ...newState };

    case RESET_FORM_SELECTED:
      return initialState;

    default:
      return state;
  }
};

export default formSelected;
