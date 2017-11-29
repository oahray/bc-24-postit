import axios from 'axios';

import {
  BASE_URL,
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE
} from '../index';

export const getGroupMessagesLoading = () => ({
  type: GET_GROUP_MESSAGES_LOADING
});

const getGroupMessagesSuccess = response => ({
  type: GET_GROUP_MESSAGES_SUCCESS,
  response
});

const getGroupMessagesFailure = error => ({
  type: GET_GROUP_MESSAGES_FAILURE,
  error
});

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
