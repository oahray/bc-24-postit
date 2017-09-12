import axios from 'axios';

import { BASE_URL, getGroupMessages } from '../index';

export const SEND_MESSAGE_LOADING = 'SEND_MESSAGE_LOADING';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const sendMessageLoading = () => {
  return {
    type: SEND_MESSAGE_LOADING
  }
};

const sendMessageSuccess = (response) => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    response
  }
};

const sendMessageFailure = (error) => {
  return {
    type: SEND_MESSAGE_FAILURE,
    error
  }
};

export const sendMessage = (groupId, content, priority, token, messageAdded) => {
  return (dispatch, getState) => {
    dispatch(sendMessageLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/message`;
    axios({
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
      response.statusText;
      if (response.statusText === 'Created') {
        dispatch(sendMessageSuccess(response));
        dispatch(getGroupMessages(groupId, token))
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log('>>>>>>>>>get messages error: ', err.response);
        dispatch(sendMessageFailure(err.response.data.error));
      }
    });
  };
};
