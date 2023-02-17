import { SET_FOOTER } from "../actions/types";

const initialState = {fix:false};

const footer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FOOTER:
      return { fix: payload };

    default:
      return state;
  }
}

export default footer