import axios from 'axios';

import { BASE_URL } from '../index';

export const markAsRead = (groupId, messageId, token) => {
  const FETCH_URL = `${BASE_URL}/group/${groupId}/message/${messageId}/read`;
  axios({
    method: 'post',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  })
  .catch((err) => {
    if (err.response) {
      return {
        type: 'MARK_READ_FAILURE'
      };
    }
  });
};
