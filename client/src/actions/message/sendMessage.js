import axios from 'axios';

import { getGroupMessages } from '../index';
import {
  BASE_URL,
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from '../../constants';

export const sendMessageLoading = () => ({
  type: SEND_MESSAGE_LOADING
});

const sendMessageSuccess = response => ({
  type: SEND_MESSAGE_SUCCESS,
  response
});

const sendMessageFailure = error => ({
  type: SEND_MESSAGE_FAILURE,
  error
});

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
