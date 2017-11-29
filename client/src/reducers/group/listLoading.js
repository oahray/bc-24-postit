import { GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS,
  GROUPS_LIST_FAILURE } from '../../constants';

export default (state = false, action) => {
  switch (action.type) {
    case GROUPS_LIST_LOADING:
      return true;
    case GROUPS_LIST_SUCCESS:
      return false;
    case GROUPS_LIST_FAILURE:
      return false;
    default:
      return state;
  }
};
