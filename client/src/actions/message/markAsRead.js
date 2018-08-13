import axios from 'axios';
import {
  BASE_URL
} from '../../constants';


/**
 * @function markAsRead
 * @param {string} groupId
 * @param {Number} messageId
 * @param {string} token
 * @returns {Promise} markAsRead
 */
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
