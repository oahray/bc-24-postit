import axios from 'axios';
import toastr from 'toastr';

import { getGroupList } from '../index';
import {
  BASE_URL,
  EDIT_GROUP_INFO_LOADING,
  EDIT_GROUP_INFO_SUCCESS,
  EDIT_GROUP_INFO_FAILURE
} from '../../constants';

/** Edit group loading: dispatched when the request
 * is made, before a response is gotten
 * @returns {object} action
 */
export const editGroupLoading = () => ({
  type: EDIT_GROUP_INFO_LOADING
});

/** Edit group success: dispatched when the
 * request is successful
 * @param {object} response: api response
 * @returns {object} action
 */
const editGroupSuccess = response => ({
  type: EDIT_GROUP_INFO_SUCCESS,
  response
});

/**
 * Edit group failure: dispatched when the
 * request to the API fails
 * @param {object} error
 * @returns {object} action
 */
const editGroupFailure = error => ({
  type: EDIT_GROUP_INFO_FAILURE,
  error
});

/**
 * Edit group: called from component, and dispatches
 * actions creators based on succes or failure of request
 * @param {string} groupId: ID of specified group
 * @param {string} name: group name
 * @param {string} description: group description
 * @param {string} type: group type
 * @param {string} token: auth token from header
 * @returns {function} dispatch
 */
export const editGroupInfo = (groupId, name, description, type, token) =>
(dispatch) => {
  dispatch(editGroupLoading());
  const FETCH_URL = `${BASE_URL}/group/${groupId}/info`;
  return axios({
    method: 'patch',
    url: FETCH_URL,
    data: {
      name,
      description,
      type
    },
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    toastr.info(response.data.message);
    dispatch(editGroupSuccess(response));
    dispatch(getGroupList(token));
  })
  .catch((err) => {
    toastr.error(err.response.data.error);
    return dispatch(editGroupFailure(err.response.data.error));
  });
};
