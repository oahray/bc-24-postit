import axios from 'axios';

import { BASE_URL } from '../index';

export const GET_GROUP_USERS_LOADING = 'GET_GROUP_USERS_LOADING';
export const GET_GROUP_USERS_SUCCESS = 'GET_GROUP_USERS_SUCCESS';
export const GET_GROUP_USERS_FAILURE = 'GET_GROUP_USERS_FAILURE';

const getGroupUsersLoading = () => {
  return {
    type: GET_GROUP_USERS_LOADING
  };
};

/**
 * @constructor
 * @param  {object} response
 */
const getGroupUsersSuccess = (response) => {
  return {
    type: GET_GROUP_USERS_SUCCESS,
    response
  };
};

const getGroupUsersFailure = (error) => {
  return {
    type: GET_GROUP_USERS_FAILURE,
    error
  };
};

export const getGroupUsers = (groupId, token) => {
  return (dispatch) => {
    dispatch(getGroupUsersLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/users`;
    axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(getGroupUsersSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(getGroupUsersFailure(err.response.data.error));
      }
    });
  };
};
