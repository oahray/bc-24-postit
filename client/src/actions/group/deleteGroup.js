import axios from 'axios';
import toastr from 'toastr';

import { BASE_URL, getGroupList } from '../index';

export const DELETE_GROUP_LOADING = 'DELETE_GROUP_LOADING';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';

const deleteGroupLoading = () => ({
  type: DELETE_GROUP_LOADING
});

const deleteGroupSuccess = response => ({
  type: DELETE_GROUP_SUCCESS,
  response
});

const deleteGroupFailure = error => ({
  type: DELETE_GROUP_FAILURE,
  error
});

export const deleteGroup = (groupId, token) =>
(dispatch) => {
  dispatch(deleteGroupLoading());
  const FETCH_URL = `${BASE_URL}/group/${groupId}/remove`;
  axios({
    method: 'post',
    url: FETCH_URL,
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    if (response.statusText === 'Created') {
      dispatch(deleteGroupSuccess(response));
      dispatch(getGroupList(token));
      // window.location.pathname = '/';
      toastr.info(response.data.message);
    }
  })
  .catch((err) => {
    if (err.response) {
      const errorMessage = err.response.data.error;
      toastr.info(errorMessage);
      dispatch(deleteGroupFailure(errorMessage));
    }
  });
};
