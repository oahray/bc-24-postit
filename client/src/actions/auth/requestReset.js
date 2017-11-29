import axios from 'axios';

import { BASE_URL } from '../index';

export const REQUEST_RESET_LOADING = 'REQUEST_RESET_LOADING';
export const REQUEST_RESET_SUCCESS = 'REQUEST_RESET_SUCCESS';
export const REQUEST_RESET_FAILURE = 'REQUEST_RESET_FAILURE';
export const CLEAR_REQUEST_RESET_MESSAGE = 'CLEAR_REQUEST_RESET_MESSAGE';

export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

/**
 * @returns {object} request_reset_loading action
 */
const requestResetLoading = () => ({
  type: REQUEST_RESET_LOADING
});

/**
 * @param {object} response: api response
 * @returns {object} request_reset_success action
 */
const requestResetSuccess = response => ({
  type: REQUEST_RESET_SUCCESS,
  response
});

/**
 * @param {object} error: api error response
 * @returns {object} request_reset_failure action
 */
const requestResetFailed = error => ({
  type: REQUEST_RESET_FAILURE,
  error
});

/**
 * @returns {object} clear_request_reset_message action
 */
export const clearResetRequestMessage = () => ({
  type: CLEAR_REQUEST_RESET_MESSAGE
});

/**
* @param {string} email: the new password
* @returns {function} dispaches action creator
*/
export const requestReset = email =>
  (dispatch) => {
    dispatch(requestResetLoading());
    const FETCH_URL = `${BASE_URL}/forgotpassword`;
    axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        email
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(requestResetSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(requestResetFailed(err.response.data.error));
      }
    });
  };

/**
 * @returns {object} reset_password_loading action
 */
const resetPasswordLoading = () => ({
  type: 'RESET_PASSWORD_LOADING'
});

/**
 * @param {object} response: api response
 * @returns {object} reset_password_success action
 */
const resetPasswordSuccess = response => ({
  type: RESET_PASSWORD_SUCCESS,
  response
});

/**
 * @param {object} error: api error response
 * @returns {object} reset_password_failed action
 */
const resetPasswordFailed = error => ({
  type: RESET_PASSWORD_FAILED,
  error
});

/**
 * @param {string} password: the new password
 * @param {string} resetHash: hash from reset email
 * @returns {function} dispatches action creator
 */
export const resetPassword = (password, resetHash) =>
  (dispatch) => {
    dispatch(resetPasswordLoading());
    const FETCH_URL = `${BASE_URL}/resetpassword?t=${resetHash}`;
    axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        password
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(resetPasswordSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(resetPasswordFailed(err.response.data.error));
      }
    });
  };
