import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE } from '../../../actions';

export default (state = false, action) => {
  switch (action.type) {
    case VERIFY_AUTH_LOADING:
      return true;
    case VERIFY_AUTH_SUCCESS:
      return false;
    case VERIFY_AUTH_FAILURE:
      return false;
    default:
      return state;
  }
};
