import { LOGIN_FAILURE, LOGIN_SUCCESS } from "./actions";

const initialState = {
  user: null,
  failure: false,
  success: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        success: true,
        failure: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        success: false,
        failure: true,
      };
    default:
      return state;
  }
};

export default userReducer;
