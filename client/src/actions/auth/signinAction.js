import axios from 'axios';
import toastr from 'toastr';

import {
  BASE_URL,
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from '../../constants';

/**
 * @function signinLoading
 * @description: dispatched when request
 * to sign in is made
 * @returns {object} signin_loading action
 */
export const signinLoading = () => ({
  type: SIGNIN_LOADING
});

/**
 * @function signinSuccess
 * @param {object} response: api response
 * @returns {object} signin_success action
 */
const signinSuccess = response => ({
  type: SIGNIN_SUCCESS,
  response
});

/**
 * @function signinFailure
 * @param {object} error: api error response
 * @returns {object} signin_failure action
 */
const signinFailure = error => ({
  type: SIGNIN_FAILURE,
  error
});

/**
 * @function signinUser
 * @description: function that makes an API request
 * to and dispatches action creators
 * based on API response
 * @param {string} username
 * @param {string} password
 * @returns {function} dispatches action creator
 */
export const signinUser = (username, password) =>
(dispatch) => {
  dispatch(signinLoading());
  const FETCH_URL = `${BASE_URL}/user/signin`;
  return axios({
    method: 'post',
    url: FETCH_URL,
    data: {
      username,
      password
    }
  })
  .then((response) => {
    toastr.info(response.data.message);
    return dispatch(signinSuccess(response));
  })
  .catch((err) => {
    dispatch(signinFailure(err.response.data.error));
  });
};
