import axios from 'axios';
import toastr from 'toastr';

import { BASE_URL } from '../index';

export const SIGNUP_LOADING = 'SIGNUP_LOADING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

/**
 * @returns {object} signup_loading action
 */
export const signupLoading = () => ({
  type: SIGNUP_LOADING
});

/**
 * @param {object} response: api response
 * @returns {object} signup_success action
 */
const signupSuccess = response => ({
  type: SIGNUP_SUCCESS,
  response
});

/**
 * @param {object} error: api error response
 * @returns {object} signin_failure action
 */
const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  error
});

/**
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {function} dispatches action creator
 */
export const signupUser = (username, password, email) =>
  (dispatch) => {
    dispatch(signupLoading());
    const FETCH_URL = `${BASE_URL}/user/signup`;
    return axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        username,
        password,
        email
      }
    })
    .then((response) => {
      if (response.status === 201) {
        dispatch(signupSuccess(response));
        toastr.info(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(signupFailure(err.response.data.error));
      }
    });
  };
