import axios from 'axios';

import {
  BASE_URL,
  VERIFY_AUTH_LOADING,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE
} from '../index';

/**
 * @function verifyAuthLoading
 * @returns {object} verify_auth_loading action
 */
export const verifyAuthLoading = () => ({
  type: VERIFY_AUTH_LOADING
});

/**
 * @function verifyAuthSuccess
 * @description Action creator for auth success
 * @param {object} response: api response
 * @returns {object} verify_auth_success action
 */
const verifyAuthSuccess = response => ({
  type: VERIFY_AUTH_SUCCESS,
  response
});

/**
 * @function verifyAuthFailure
 * @description: Action creator for auth failure actions
 * @param {object} response: api error response
 * @returns {object} verify_auth_failure action
 */
const verifyAuthFailure = response => ({
  type: VERIFY_AUTH_FAILURE,
  response
});

/**
 * @function verifyAuth
 * @description: function to verify user authentication
 * @param {string} token
 * @returns {function} dispatches action creator
 */
export const verifyAuth = token =>
  (dispatch) => {
    dispatch(verifyAuthLoading());
    const FETCH_URL = `${BASE_URL}/user/me`;
    return axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      dispatch(verifyAuthSuccess(response));
    })
    .catch((err) => {
      dispatch(verifyAuthFailure(err.response.data.error));
    });
  };
