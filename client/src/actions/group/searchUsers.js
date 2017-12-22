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
 * @function clearUserSearchTerm
 * @returns {object} action
 */
export const clearUserSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM
});

/**
 * @function searchUsersLoading
 * @returns {object} action
 */
const searchUsersLoading = () => ({
  type: SEARCH_USERS_LOADING
});

/**
 * @function searchUsersSuccess
 * @param {object} response
 * @returns {object} action
 */
const searchUsersSuccess = response => ({
  type: SEARCH_USERS_SUCCESS,
  response
});

/**
 * @function searchUsersFailure
 * @param {object} error
 * @returns {object} action
 */
const searchUsersFailure = error => ({
  type: SEARCH_USERS_FAILURE,
  error
});

/**
 * @function searchUsers
 * @description: Action creator searches users and dispatches
 * other action creators based on status of request.
 * @param {string} groupId
 * @param {string} username
 * @param {string} offset
 * @param {string} limit
 * @param {string} token
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
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


/**
 * @function addUserLoading
 * @description: Action creator that is dispatched when
 * the request to add user is successful.
 * @returns {Object} action with type ADD_USER_LOADING
 */
const addUserLoading = () => ({
  type: ADD_USER_LOADING
});

/**
 * @function addUserSuccess
 * @description: Action creator that is dispatched when
 * the request to add user is loading.
 * @param {Object} response
 * @returns {Object} action with type ADD_USER_SUCCESS
 */
const addUserSuccess = response => ({
  type: ADD_USER_SUCCESS,
  response
});

/**
 * @function addUserFailure
 * @description: Action creator that is dispatched when
 * the request to send message is loading.
 * @param {string} error
 * @returns {Object} action with type ADD_USER_FAILURE
 */
const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  error
});

/**
 * @function addUserToGroup
 * @description: Action creator searches users and dispatches
 * other action creators based on status of request.
 * @param {string} username
 * @param {string} groupid
 * @param {string} token
 * @returns {Object} action based on api response
 */
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


/**
 * @function removeUserLoading
 * @description: Action creator that is dispatched when
 * the request to user is successful.
 * @returns {Object} action with type REMOVE_USER_LOADING
 */
const removeUserLoading = () => ({
  type: REMOVE_USER_LOADING
});

/**
 * @function removeUserSuccess
 * @description: Action creator that is dispatched when
 * the request to remove user succeeds.
 * @param {Object} response
 * @returns {Object} action with type REMOVE_USER_SUCCESS
 */
const removeUserSuccess = response => ({
  type: REMOVE_USER_SUCCESS,
  response
});

/**
 * @function removeUserFailure
 * @description: Action creator that is dispatched when
 * the request remove user fails.
 * @param {string} error
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
const removeUserFailure = error => ({
  type: REMOVE_USER_FAILURE,
  error
});

/**
 * @function removeUser
 * @description: Action creator searches users and dispatches
 * other action creators based on status of request.
 * @param {string} username
 * @param {string} groupId
 * @param {string} token
 * @returns {Object} action based on api response
 */
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
