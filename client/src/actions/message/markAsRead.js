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
  .then(() => {
    console.log('You have read this...');
    
  })
  .catch((err) => {
    if (err.response) {
      console.log('Error occured marking as read: ', err.response);
      return {
        type: 'MARK_READ_FAILURE'
      };
    }
  });
};
