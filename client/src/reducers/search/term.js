import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from '../../constants';

/**
   * @function term
   * @description reducer that sets the redux state
   * with the user search term
   * @param {Boolean} state
   * @param {Object} action
   * @returns {string} username regex used for search
   */
export default (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.searchTerm;
    case CLEAR_SEARCH_TERM:
      return '';
    default:
      return state;
  }
};
