import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from '../../constants';

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
