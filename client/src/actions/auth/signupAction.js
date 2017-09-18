import axios from 'axios';

import { BASE_URL } from '../index';

export const SIGNUP_LOADING = 'SIGNUP_LOADING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const signupLoading = () => ({
  type: SIGNUP_LOADING
});

const signupSuccess = response => ({
  type: SIGNUP_SUCCESS,
  response
});

const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  error
});

export const signupUser = (username, password, email) =>
  (dispatch) => {
    dispatch(signupLoading());
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
      if (response.statusText === 'Created') {
        dispatch(signupSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(signupFailure(err.response.data.error));
      }
    });
  };
