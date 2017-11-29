import axios from 'axios';

import { BASE_URL } from '../index';

export const GROUPS_LIST_LOADING = 'GROUPS_LIST_LOADING';
export const GROUPS_LIST_SUCCESS = 'GROUPS_LIST_SUCCESS';
export const GROUPS_LIST_FAILURE = 'GROUPS_LIST_FAILURE';

const groupListLoading = () => {
  return {
    type: GROUPS_LIST_LOADING
  };
};

const groupListSuccess = (response) => {
  return {
    type: GROUPS_LIST_SUCCESS,
    response
  };
};

const groupsListFailure = (response) => {
  return {
    type: GROUPS_LIST_FAILURE,
    response
  };
};

export const getGroupList = (token) => {
  const FETCH_URL = `${BASE_URL}/user/me/groups`;
  return (dispatch, getState) => {
    dispatch(groupListLoading());
    const request = axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(groupListSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(groupsListFailure(err.response));
      }
    });
  };
};
