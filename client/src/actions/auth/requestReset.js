import axios from 'axios';

import { BASE_URL } from '../index';

export const REQUEST_RESET_LOADING = 'REQUEST_RESET_LOADING';
export const REQUEST_RESET_SUCCESS = 'REQUEST_RESET_SUCCESS';
export const REQUEST_RESET_FAILURE = 'REQUEST_RESET_FAILURE';
export const CLEAR_REQUEST_RESET_MESSAGE = 'CLEAR_REQUEST_RESET_MESSAGE';

export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

// Request password reset
const requestResetLoading = () => {
  return {
    type: REQUEST_RESET_LOADING
  };
};

const requestResetSuccess = (response) => {
  return {
    type: REQUEST_RESET_SUCCESS,
    response
  };
};

const requestResetFailed = (error) => {
  return {
    type: REQUEST_RESET_FAILURE,
    error
  };
};

export const clearResetRequestMessage = () => {
  return {
    type: CLEAR_REQUEST_RESET_MESSAGE
  };
};

export const requestReset = (email) => {
  return (dispatch) => {
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
};

// Reset Password
const resetPasswordLoading = () => {
  return {
    type: 'RESET_PASSWORD_LOADING'
  };
};

const resetPasswordSuccess = (response) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    response
  };
};

const resetPasswordFailed = (error) => {
  return {
    type: RESET_PASSWORD_FAILED,
    error
  };
};

export const resetPassword = (password, resetHash) => {
  return (dispatch) => {
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
};
