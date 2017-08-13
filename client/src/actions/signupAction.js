import axios from 'axios';

import { BASE_URL } from './index';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const signupSuccess = (response) => {
  return {
    type: SIGNUP_SUCCESS,
    response
  }
};

const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    error
  }
};

export const signupUser = (username, password, email) => {
  return (dispatch, getState) => {
    const FETCH_URL = `${BASE_URL}/user/signup`;
    axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        username,
        password,
        email
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(signupSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        dispatch(signupFailure(err.response.data.error));
      }
    });
  }
}