import { SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE } from '../actions';

export default (state = false, action) => {
  switch (action.type) {
    case SIGNIN_LOADING:
      return true;
    case SIGNIN_SUCCESS:
      return false;
    case SIGNIN_FAILURE:
      return false;
    case SIGNUP_LOADING:
      return true;
    case SIGNUP_SUCCESS:
      return false;
    case SIGNUP_FAILURE:
      return false;
    default:
      return state;
  }
};
