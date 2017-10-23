import axios from 'axios';
import toastr from 'toastr';

import { BASE_URL } from '../index';

export const LEAVE_GROUP_LOADING = 'LEAVE_GROUP_LOADING';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';
export const LEAVE_GROUP_FAILURE = 'LEAVE_GROUP_FAILURE';

const leaveGroupLoading = () => ({
  type: LEAVE_GROUP_LOADING
});

const leaveGroupSuccess = response => ({
  type: LEAVE_GROUP_SUCCESS,
  response
});

const leaveGroupFailure = error => ({
  type: LEAVE_GROUP_FAILURE,
  error
});

export const leaveGroup = (groupId, token) =>
(dispatch) => {
  dispatch(leaveGroupLoading());
  const FETCH_URL = `${BASE_URL}/group/${groupId}/leave`;
  axios({
    method: 'post',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    if (response.statusText === 'Created') {
      toastr.info(response.data.message);
      dispatch(leaveGroupSuccess(response));
    }
  })
  .catch((err) => {
    if (err.response) {
      toastr.info(err.response.data.error);
      dispatch(leaveGroupFailure(err.response.data.error));
    }
  });
};
