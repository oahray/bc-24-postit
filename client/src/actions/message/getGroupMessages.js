import axios from 'axios';

import {
  BASE_URL,
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE
} from '../index';

/**
 * @function getGroupMessagesLoading
 * @description: Action creator that is dispatched when
 * a request is made.
 * @returns {Object} action with type GET_GROUP_MESSAGES_LOADING
 */
export const getGroupMessagesLoading = () => ({
  type: GET_GROUP_MESSAGES_LOADING
});

/**
 * @function getGroupMessagesSuccess
 * @description: Action creator that is dispatched when
 * the request to get group messages is successful.
 * @param {Object} response
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
const getGroupMessagesSuccess = response => ({
  type: GET_GROUP_MESSAGES_SUCCESS,
  response
});

/**
 * @function getGroupMessagesFailure
 * @description: Action creator that is dispatched when
 * the request to get group messages is successful.
 * @param {string} error
 * @returns {Object} action with type GET_GROUP_MESSAGES_FAILURE
 */
const getGroupMessagesFailure = error => ({
  type: GET_GROUP_MESSAGES_FAILURE,
  error
});

/**
 * @function getGroupMessages
 * @description: Action creator that is dispatched when
 * the request to get group messages is successful.
 * @param {string} groupId
 * @param {string} token
 * @returns {Object} action from either success
 * or failure response
 */
export const getGroupMessages = (groupId, token) =>
  (dispatch) => {
    dispatch(getGroupMessagesLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/messages`;
    return axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      dispatch(getGroupMessagesSuccess(response));
    })
    .catch((err) => {
      dispatch(getGroupMessagesFailure(err.response.data.error));
    });
  };
