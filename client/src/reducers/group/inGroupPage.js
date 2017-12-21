import { IN_GROUP_TRUE, IN_GROUP_FALSE } from '../../constants';

/**
   * @function inGroupPage
   * @description reducer that sets the redux state
   * with the a boolean indicating whether the user is
   * in a group page or not
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case IN_GROUP_TRUE:
      return true;
    case IN_GROUP_FALSE:
      return false;
    default:
      return state;
  }
};
