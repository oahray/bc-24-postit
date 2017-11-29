import axios from 'axios';
import toastr from 'toastr';

import { BASE_URL } from '../index';

export const SIGNIN_LOADING = 'SIGNIN_LOADING';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

/**
 * @returns {object} signin_loading action
 */
const signinLoading = () => ({
  type: SIGNIN_LOADING
});

/**
 * @param {object} response: api response
 * @returns {object} signin_success action
 */
const signinSuccess = response => ({
  type: SIGNIN_SUCCESS,
  response
});

/**
 * @param {object} error: api error response
 * @returns {object} signin_failure action
 */
const signinFailure = error => ({
  type: SIGNIN_FAILURE,
  error
});

/**
 * @param {string} username
 * @param {string} password
 * @returns {function} dispatches action creator
 */
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
      toastr.info(response.data.message);
    }
  })
  .catch((err) => {
    if (err.response) {
      dispatch(signinFailure(err.response.data.error));
    }
  });
};
