import axios from 'axios';

import { BASE_URL, getGroupList } from '../index';

export const REMOVE_USER_LOADING = 'REMOVE_USER_LOADING';
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
export const REMOVE_USER_FAILURE = 'REMOVE_USER_FAILURE';
export const RESET_REMOVE_USER_STATUS = 'RESET_REMOVE_USER_STATUS';

const removeUserLoading = () => ({
  type: REMOVE_USER_LOADING
});

const removeUserSuccess = response => ({
  type: REMOVE_USER_SUCCESS,
  response
});

const removeUserFailure = error => ({
  type: REMOVE_USER_FAILURE,
  error
});

export const resetremoveUserStatus = () => ({
  type: RESET_REMOVE_USER_STATUS
});

export const removeUser = (groupId, username, token) =>
(dispatch) => {
  dispatch(removeUserLoading());
  const FETCH_URL = `${BASE_URL}/group`;
  axios({
    method: 'delete',
    url: FETCH_URL,
    data: {
      username
    },
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    if (response.statusText === 'Created') {
      dispatch(removeUserSuccess(response));
      dispatch(getGroupList(token));
    }
  })
  .catch((err) => {
    if (err.response) {
      dispatch(removeUserFailure(err.response.data.error));
    }
  });
};
