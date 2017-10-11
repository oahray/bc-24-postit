import axios from 'axios';

import {
  BASE_URL,
  GET_GROUP_USERS_LOADING,
  GET_GROUP_USERS_SUCCESS,
  GET_GROUP_USERS_FAILURE
} from '../index';

/** get group users: dispatched when
 * request is made to get a group's users
 * @returns {object} action
 */
export const getGroupUsersLoading = () => ({
  type: GET_GROUP_USERS_LOADING
});

/** get group success: dispatched when
 * request to get users is successfull
 * @param  {object} response
 * @returns {object} action
 */
const getGroupUsersSuccess = response => ({
  type: GET_GROUP_USERS_SUCCESS,
  response
});

/** get group users failure
 * @param {object} error: api error response
 * @returns {object} action
 */
const getGroupUsersFailure = error => ({
  type: GET_GROUP_USERS_FAILURE,
  error
});

/** getGroupUsers
 * @summary: thunk that makes request to get group users
 * and dispatches action creators based on api response
 * @param {*} groupId
 * @param {*} token
 * @returns {function} dispatch
 */
export const getGroupUsers = (groupId, token) =>
  (dispatch) => {
    dispatch(getGroupUsersLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/users`;
    return axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      dispatch(getGroupUsersSuccess(response));
    })
    .catch((err) => {
      dispatch(getGroupUsersFailure(err.response.data.error));
    });
  };
