import axios from 'axios';
import toastr from 'toastr';

import { getGroupList } from '../index';
import {
  BASE_URL,
  CREATE_GROUP_LOADING,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  RESET_CREATE_GROUP_STATUS
} from '../../constants';

/**
 * @returns {object} client_group_loading action
 */
const createGroupLoading = () => ({
  type: CREATE_GROUP_LOADING
});

/**
 * @param {object} response: api response
 * @returns {object} create_group_success action
 */
const createGroupSuccess = response => ({
  type: CREATE_GROUP_SUCCESS,
  response
});

/**
 * @param {object} error: api error response
 * @returns {object} create_group_failure action
 */
const createGroupFailure = error => ({
  type: CREATE_GROUP_FAILURE,
  error
});

/**
 * @returns {object} reset_create_group status action
 */
export const resetCreateGroupStatus = () => ({
  type: RESET_CREATE_GROUP_STATUS
});

/**
 * @param {*} name
 * @param {*} description
 * @param {*} type
 * @param {*} token
 * @returns {function} axios post
 */
export const createNewGroup = (name, description, type, token) =>
(dispatch) => {
  dispatch(createGroupLoading());
  const FETCH_URL = `${BASE_URL}/group`;
  return axios({
    method: 'post',
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
    dispatch(createGroupSuccess(response));
    toastr.success(response.data.message);
    dispatch(getGroupList(token));
  })
  .catch((err) => {
    toastr.error(err.response.data.error);
    dispatch(createGroupFailure(err.response.data.error));
  });
};
