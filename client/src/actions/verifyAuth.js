import axios from 'axios';

import { BASE_URL } from './index';

export const VERIFY_AUTH_SUCCESS = 'VERIFY_AUTH_SUCCESS';
export const VERIFY_AUTH_FAILURE = 'VERIFY_AUTH_FAILURE';

const verifyAuthSuccess = (response) => {
  return {
    type: VERIFY_AUTH_SUCCESS,
    response
  }
};

const verifyAuthFailure = (response) => {
  return {
    type: VERIFY_AUTH_FAILURE,
    response
  }
};

export const verifyAuth = (token) => {
  return (dispatch, getState) => {
    const FETCH_URL = `${BASE_URL}/user/me`;
    axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(verifyAuthSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(verifyAuthFailure(err.response.data.error));
      }
    });
  }
}