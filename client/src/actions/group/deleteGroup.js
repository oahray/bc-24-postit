import axios from 'axios';
import toastr from 'toastr';

import { BASE_URL, getGroupList } from '../index';

export const DELETE_GROUP_LOADING = 'DELETE_GROUP_LOADING';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';

/**
 * @returns {object} delete group action
 */
const deleteGroupLoading = () => ({
  type: DELETE_GROUP_LOADING
});

/**
 * Delete group success - dispatched when
 * group has been successfully deleted
 * @param {object} response: api response
 * @returns {object} action
 */
const deleteGroupSuccess = response => ({
  type: DELETE_GROUP_SUCCESS,
  response
});

/**
 * Delete group failure
 * @summary dispatched when request to delete
 * a group fails
 * @param {object} error: api error response
 * @returns {object} delete group action
 */
const deleteGroupFailure = error => ({
  type: DELETE_GROUP_FAILURE,
  error
});

/**
 * delete group thunk
 * dispatches action creators
 * based on request failure or success
 * @param {string} groupId
 * @param {string} token
 * @returns {object} action
 */
export const deleteGroup = (groupId, token) =>
(dispatch) => {
  dispatch(deleteGroupLoading());
  const FETCH_URL = `${BASE_URL}/group/${groupId}/remove`;
  axios({
    method: 'post',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    if (response.statusText === 'Created') {
      dispatch(getGroupList(token));
      toastr.info(response.data.message);
      return dispatch(deleteGroupSuccess(response));
    }
  })
  .catch((err) => {
    if (err.response) {
      const errorMessage = err.response.data.error;
      toastr.info(errorMessage);
      return dispatch(deleteGroupFailure(errorMessage));
    }
  });
};
