import * as actionTypes from './types';

const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        error: null, // Clear any previous errors
      };
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload, // Capture the error message
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        current: action.payload,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case actionTypes.LOGOUT_FAILED:
      return {
        ...state,
        current: action.payload,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
