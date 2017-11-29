import axios from 'axios';

import {
  BASE_URL,
  GROUPS_LIST_LOADING,
  GROUPS_LIST_SUCCESS,
  GROUPS_LIST_FAILURE
} from '../../constants';

/** group list loading:  dispatched
 * when request is made
 * @returns {object} action
 */
export const groupListLoading = () => ({
  type: GROUPS_LIST_LOADING
});

/** group list success: dispatched when
 * success respons is received from API
 * @param {object} response: api response
 * @returns {object} action
 */
const groupListSuccess = response => ({
  type: GROUPS_LIST_SUCCESS,
  response
});

/** group list failure: dispached when api
 * request fails
 * @param {*} response: api response
 * @returns {object} action
 */
const groupsListFailure = response => ({
  type: GROUPS_LIST_FAILURE,
  response
});

/** getGroupList
 * @summary: a thunk that gets a user's group list.
 * Dispatches a success or failure action creature
 * @param {string} token: auth token
 * @returns {function} dispatch
 */
export const getGroupList = token => (dispatch) => {
  dispatch(groupListLoading());
  const FETCH_URL = `${BASE_URL}/user/me/groups`;
  return axios({
    method: 'get',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    dispatch(groupListSuccess(response));
  })
  .catch((err) => {
    dispatch(groupsListFailure(err.response));
  });
};
