import { CREATE_GROUP_SUCCESS,
  RESET_CREATE_GROUP_STATUS } from '../../constants';

/**
   * @function created
   * @description reducer that sets the redux state
   * with the created group object
   * @param {null} state
   * @param {Object} action
   * @returns {Object | null} true/false depending on action type
   */
export default (state = null, action) => {
  switch (action.type) {
    case CREATE_GROUP_SUCCESS:
      return action.response.data.group;
    case RESET_CREATE_GROUP_STATUS:
      return null;
    default:
      return state;
  }
};
