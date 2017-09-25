import { SEARCH_USERS_LOADING, SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_USERS_LOADING:
      return {};
    case SEARCH_USERS_SUCCESS:
      return action.response.data;
    case SEARCH_USERS_FAILURE:
      return {};
    default:
      return state;
  }
};
