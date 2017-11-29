import axios from 'axios';
import {
  BASE_URL,
  MARK_READ_FAILURE
} from '../../constants';

export const markFailed = () => ({
  type: MARK_READ_FAILURE
});

export const markAsRead = (groupId, messageId, token) =>
  (dispatch) => {
    const FETCH_URL = `${BASE_URL}/group/${groupId}/message/${messageId}/read`;
    return axios({
      method: 'post',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
      .catch(() => {
        dispatch(markFailed());
      });
  };
