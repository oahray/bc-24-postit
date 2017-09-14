import axios from 'axios';

import { BASE_URL, getGroupList } from '../index';

export const CREATE_GROUP_LOADING = 'CREATE_GROUP_LOADING';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';
export const RESET_CREATE_GROUP_STATUS = 'RESET_CREATE_GROUP_STATUS'; 

const createGroupLoading = () => {
  return {
    type: CREATE_GROUP_LOADING
  };
};

const createGroupSuccess = (response) => {
  return {
    type: CREATE_GROUP_SUCCESS,
    response
  };
};

const createGroupFailure = (error) => {
  return {
    type: CREATE_GROUP_FAILURE,
    error
  };
};

export const resetCreateGroupStatus = () => {
  return {
    type: RESET_CREATE_GROUP_STATUS
  };
};

export const createNewGroup = (name, description, type, token) => {
  return (dispatch, getState) => {
    dispatch(createGroupLoading());
    const FETCH_URL = `${BASE_URL}/group`;
    axios({
      method: 'post',
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
        dispatch(createGroupSuccess(response));
        dispatch(getGroupList(token))
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(createGroupFailure(err.response.data.error));
      }
    });
  };
};
