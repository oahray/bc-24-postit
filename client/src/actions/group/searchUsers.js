import axios from 'axios';
import toastr from 'toastr';

import {
  BASE_URL,
  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  SEARCH_USERS_LOADING,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  ADD_USER_LOADING,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  REMOVE_USER_LOADING,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE
} from '../index';

/** setUserSearchTerm
 * @summary: sets search term
 * @param {string} term: search term
 * @returns {object} action
 */
const setUserSearchTerm = term => ({
  type: SET_SEARCH_TERM,
  searchTerm: term
});

/**
 * @returns {object} action
 */
export const clearUserSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM
});

/**
 * @returns {object} action
 */
const searchUsersLoading = () => ({
  type: SEARCH_USERS_LOADING
});

/**
 * @param {object} response
 * @returns {object} action
 */
const searchUsersSuccess = response => ({
  type: SEARCH_USERS_SUCCESS,
  response
});

/**
 * @param {object} error
 * @returns {object} action
 */
const searchUsersFailure = error => ({
  type: SEARCH_USERS_FAILURE,
  error
});

export const searchUsers = (groupId, username, offset, limit, token) =>
  (dispatch) => {
    dispatch(setUserSearchTerm(username));
    dispatch(searchUsersLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId
      }/users?members=false&username=${username
      }&offset=${offset}&limit=${limit}`;
    return axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
      .then((response) => {
        dispatch(searchUsersSuccess(response));
      })
      .catch((err) => {
        dispatch(searchUsersFailure(err.response.data.error));
      });
  };


// ADD USER FROM SEARCH RESUKTS
const addUserLoading = () => ({
  type: ADD_USER_LOADING
});

const addUserSuccess = response => ({
  type: ADD_USER_SUCCESS,
  response
});

const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  error
});

export const addUserToGroup = (username, groupid, token) => 
  (dispatch) => {
    dispatch(addUserLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupid}/user`;
    return axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        username
      },
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      dispatch(addUserSuccess(response));
      toastr.info(`${response.data.message}`);
    })
    .catch((err) => {
      toastr.error(`${err.response.data.message}`);
      dispatch(addUserFailure(err.response.data.error));
    });
  };


// Remove from group
const removeUserLoading = () => ({
  type: REMOVE_USER_LOADING
});

const removeUserSuccess = response => ({
  type: REMOVE_USER_SUCCESS,
  response
});

const removeUserFailure = error => ({
  type: REMOVE_USER_FAILURE,
  error
});

export const removeUser = (username, groupId, token) =>
  (dispatch) => {
    dispatch(removeUserLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/user`;
    return axios({
      method: 'delete',
      url: FETCH_URL,
      data: {
        username
      },
      headers: {
        'x-auth': token
      }
    })
      .then((response) => {
        dispatch(removeUserSuccess(response));
        toastr.info(response.data.message);
      })
      .catch((err) => {
        dispatch(removeUserFailure(err.response.data.error));
        toastr.info(err.response.data.error);
      });
  };
