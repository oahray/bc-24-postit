import { SEARCH_USERS_LOADING, SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE } from '../../constants';

/**
   * @function results
   * @description reducer that sets the redux state
   * with the results of user search
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Object} search object from api
   */
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
