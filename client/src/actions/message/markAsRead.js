import axios from 'axios';
import {
  BASE_URL
} from '../../constants';

export const markAsRead = (groupId, messageId, token) => {
  const FETCH_URL = `${BASE_URL}/group/${groupId}/message/${messageId}/read`;
  return axios({
    method: 'post',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  });
};
