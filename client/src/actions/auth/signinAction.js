import axios from 'axios';

import { BASE_URL } from '../index';

export const SIGNIN_LOADING = 'SIGNIN_LOADING';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

const signinLoading = () => ({
  type: SIGNIN_LOADING
});

const signinSuccess = response => ({
  type: SIGNIN_SUCCESS,
  response
});

const signinFailure = error => ({
  type: SIGNIN_FAILURE,
  error
});

export const signinUser = (username, password) =>
(dispatch) => {
  dispatch(signinLoading());
  const FETCH_URL = `${BASE_URL}/user/signin`;
  axios({
    method: 'post',
    url: FETCH_URL,
    data: {
      username,
      password
    }
  })
  .then((response) => {
    if (response.statusText === 'OK') {
      dispatch(signinSuccess(response));
    }
  })
  .catch((err) => {
    if (err.response) {
      dispatch(signinFailure(err.response.data.error));
    }
  });
};
