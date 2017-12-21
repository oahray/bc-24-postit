import axios from 'axios';
import toastr from 'toastr';

import {
  BASE_URL,
  REQUEST_RESET_LOADING,
  REQUEST_RESET_SUCCESS,
  REQUEST_RESET_FAILURE,
  CLEAR_REQUEST_RESET_MESSAGE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../../constants';

/**
 * @function requestResetLoading
 * @description: returns an action with a
 * REQUEST_RESET_LOADING action type
 * @returns {object} request_reset_loading action
 */
const requestResetLoading = () => ({
  type: REQUEST_RESET_LOADING
});

/**
 * @function requestResetSuccess
 * @param {object} response: api response
 * @returns {object} request_reset_success action
 */
const requestResetSuccess = response => ({
  type: REQUEST_RESET_SUCCESS,
  response
});

/**
 * @function requestResetFailed
 * @param {object} error: api error response
 * @returns {object} request_reset_failure action
 */
const requestResetFailed = error => ({
  type: REQUEST_RESET_FAILURE,
  error
});

/**
 * @function clearResetRequestMessage
 * @returns {object} clear_request_reset_message action
 */
export const clearResetRequestMessage = () => ({
  type: CLEAR_REQUEST_RESET_MESSAGE
});

/**
 * @function requestReset
* @param {string} email: the new password
* @returns {function} dispatches action creator
*/
export const requestReset = email =>
  (dispatch) => {
    dispatch(requestResetLoading());
    const FETCH_URL = `${BASE_URL}/forgotpassword`;
    return axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        email
      }
    })
      .then((response) => {
        dispatch(requestResetSuccess(response));
      })
      .catch((err) => {
        dispatch(requestResetFailed(err.response.data.error));
      });
  };

/**
 * @function resetPasswordLoading
 * @returns {object} reset_password_loading action
 */
const resetPasswordLoading = () => ({
  type: RESET_PASSWORD_LOADING
});

/**
 * @function resetPasswordSuccess
 * @param {object} response: api response
 * @returns {object} reset_password_success action
 */
const resetPasswordSuccess = response => ({
  type: RESET_PASSWORD_SUCCESS,
  response
});

/**
 * @function resetPasswordFailed
 * @param {object} error: api error response
 * @returns {object} reset_password_failed action
 */
const resetPasswordFailed = error => ({
  type: RESET_PASSWORD_FAILED,
  error
});

/**
 * @function resetPassword
 * @param {string} password: the new password
 * @param {string} resetHash: hash from reset email
 * @returns {function} dispatches action creator
 */
export const resetPassword = (password, resetHash) =>
  (dispatch) => {
    dispatch(resetPasswordLoading());
    const FETCH_URL = `${BASE_URL}/resetpassword?t=${resetHash}`;
    return axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        password
      }
    })
      .then((response) => {
        dispatch(resetPasswordSuccess(response));
        toastr.info(response.data.message);
      })
      .catch((err) => {
        dispatch(resetPasswordFailed(err.response.data.error));
      });
  };
