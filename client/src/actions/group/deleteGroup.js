import axios from 'axios';
import toastr from 'toastr';

import { getGroupList } from '../index';
import {
  BASE_URL,
  DELETE_GROUP_LOADING,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE
} from '../../constants';

/**
 * @returns {object} delete group action
 */
export const deleteGroupLoading = () => ({
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
    return axios({
      method: 'post',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
      .then((response) => {
        toastr.info(response.data.message);
        dispatch(deleteGroupSuccess(response));
        dispatch(getGroupList(token));
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        toastr.info(errorMessage);
        dispatch(deleteGroupFailure(errorMessage));
      });
  };
