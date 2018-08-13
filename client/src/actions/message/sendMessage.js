import axios from 'axios';

import { getGroupMessages } from '../index';
import {
  BASE_URL,
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from '../../constants';

/**
 * @function sendMessageLoading
 * @description: Action creator that is dispatched when
 * the request to send message is successful.
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
export const sendMessageLoading = () => ({
  type: SEND_MESSAGE_LOADING
});

/**
 * @function sendMessageSuccess
 * @description: Action creator that is dispatched when
 * the request to send message is loading.
 * @param {Object} response
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
const sendMessageSuccess = response => ({
  type: SEND_MESSAGE_SUCCESS,
  response
});

/**
 * @function sendMessageFailure
 * @description: Action creator that is dispatched when
 * the request send message fails.
 * @param {string} error
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
const sendMessageFailure = error => ({
  type: SEND_MESSAGE_FAILURE,
  error
});

/**
 * @function sendMessage
 * @description: Action creator that makes request to api
 * to send a message and dispatches other action creators
 * depending on success or failure of request.
 * @param {string} groupId
 * @param {string} content
 * @param {string} priority
 * @param {string} token
 * @returns {Object} action with type GET_GROUP_MESSAGES_SUCCESS
 */
export const sendMessage = (groupId, content, priority, token) =>
  (dispatch) => {
    dispatch(sendMessageLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/message`;
    return axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        content,
        priority
      },
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      dispatch(sendMessageSuccess(response));
      dispatch(getGroupMessages(groupId, token));
    })
    .catch((err) => {
      dispatch(sendMessageFailure(err.response.data.error));
    });
  };
