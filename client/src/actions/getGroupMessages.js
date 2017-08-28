import axios from 'axios';

import { BASE_URL } from './index';

export const GET_GROUP_MESSAGES_LOADING = 'GET_GROUP_MESSAGES_LOADING';
export const GET_GROUP_MESSAGES_SUCCESS = 'GET_GROUP_MESSAGES_SUCCESS';
export const GET_GROUP_MESSAGES_FAILURE = 'GET_GROUP_MESSAGES_FAILURE';

const getGroupMessagesLoading = () => {
  return {
    type: GET_GROUP_MESSAGES_LOADING
  }
};

const getGroupMessagesSuccess = (response) => {
  return {
    type: GET_GROUP_MESSAGES_SUCCESS,
    response
  }
};

const getGroupMessagesFailure = (error) => {
  return {
    type: GET_GROUP_MESSAGES_FAILURE,
    error
  }
};

export const getGroupMessages = (groupId, token) => {
  return (dispatch, getState) => {
    dispatch(getGroupMessagesLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/messages`;
    axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(getGroupMessagesSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(getGroupMessagesFailure(err.response.data.error));
      }
    });
  }
}