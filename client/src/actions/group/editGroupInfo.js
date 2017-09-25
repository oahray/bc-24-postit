import axios from 'axios';
import toastr from 'toastr';

import { BASE_URL, getGroupList } from '../index';

export const EDIT_GROUP_INFO_LOADING = 'EDIT_GROUP_INFO_LOADING';
export const EDIT_GROUP_INFO_SUCCESS = 'EDIT_GROUP_INFO_SUCCESS';
export const EDIT_GROUP_INFO_FAILURE = 'EDIT_GROUP_INFO_FAILURE';

const editGroupInfoLoading = () => ({
  type: EDIT_GROUP_INFO_LOADING
});

const editGroupInfoSuccess = response => ({
  type: EDIT_GROUP_INFO_SUCCESS,
  response
});

const editGroupInfoFailure = error => ({
  type: EDIT_GROUP_INFO_FAILURE,
  error
});

export const editGroupInfo = (groupId, name, description, type, token) =>
(dispatch) => {
  dispatch(editGroupInfoLoading());
  const FETCH_URL = `${BASE_URL}/group/${groupId}/info`;
  axios({
    method: 'patch',
    url: FETCH_URL,
    data: {
      name,
      description,
      type
    },
    headers: {
      'x-auth': token
    }
  })
  .then((response) => {
    if (response.statusText === 'Created') {
      dispatch(editGroupInfoSuccess(response));
      dispatch(getGroupList(token));
      toastr.info(response.data.message);
    }
  })
  .catch((err) => {
    if (err.response) {
      dispatch(editGroupInfoFailure(err.response.data.error));
    }
  });
};
