import axios from 'axios';
import toastr from 'toastr';

import {
  BASE_URL,
  LEAVE_GROUP_LOADING,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE
} from '../index';

/** leaveGroupLoading
 * @returns {object} action
 */
export const leaveGroupLoading = () => ({
  type: LEAVE_GROUP_LOADING
});

/**
 * @param {object} response: api response
 * @returns {object} action
 */
const leaveGroupSuccess = response => ({
  type: LEAVE_GROUP_SUCCESS,
  response
});

/**
 * @param {object} error: api error response
 * @returns {object} action
 */
const leaveGroupFailure = error => ({
  type: LEAVE_GROUP_FAILURE,
  error
});

/**
 * @param {string} groupId
 * @param {string} token
 * @returns {function} dispatch
 */
export const leaveGroup = (groupId, token) =>
(dispatch) => {
  dispatch(leaveGroupLoading());
  const FETCH_URL = `${BASE_URL}/group/${groupId}/leave`;
  return axios({
    method: 'post',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    toastr.info(response.data.message);
    dispatch(leaveGroupSuccess(response));
  })
  .catch((err) => {
    toastr.info(err.response.data.error);
    dispatch(leaveGroupFailure(err.response.data.error));
  });
};
