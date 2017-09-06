import axios from 'axios';

import { BASE_URL } from './index';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM';
export const SEARCH_USERS_LOADING = 'SEARCH_USERS_LOADING';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';
export const ADD_USER_LOADING = 'ADD_USER_LOADING';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';


const setUserSearchTerm = (term) => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm: term
  }
};

export const clearUserSearchTerm = () => {
  return {
    type: CLEAR_SEARCH_TERM
  }
}

const searchUsersLoading = () => {
  return {
    type: SEARCH_USERS_LOADING
  }
};

const searchUsersSuccess = (response) => {
  return {
    type: SEARCH_USERS_SUCCESS,
    response
  }
};

const searchUsersFailure = (error) => {
  return {
    type: SEARCH_USERS_FAILURE,
    error
  }
};

export const searchUsers = (groupId, username, offset, limit, token) => {
  return (dispatch, getState) => {
    dispatch(setUserSearchTerm(username));
    dispatch(searchUsersLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupId}/notmembers?username=${username}&offset=${offset}&limit=${limit}`;
    axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(searchUsersSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(searchUsersFailure(err.response.data.error));
      }
    });
  }
}


// ADD USER FROM SEARCH RESUKTS
const addUserLoading = () => {
  return {
    type: ADD_USER_LOADING
  }
};

const addUserSuccess = (response) => {
  return {
    type: ADD_USER_SUCCESS,
    response
  }
};

const addUserFailure = (error) => {
  return {
    type: ADD_USER_FAILURE,
    error
  }
};

export const resetaddUserStatus = () => {
  return {
    type: RESET_ADD_USER_STATUS
  }
}

export const addUserToGroup = (username, groupid,updateSearchResult, token) => {
  return (dispatch, getState) => {
    dispatch(addUserLoading());
    const FETCH_URL = `${BASE_URL}/group/${groupid}/user`;
    axios({
      method: 'post',
      url: FETCH_URL,
      data: {
        username
      },
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'Created') {
        dispatch(addUserSuccess(response));
        dispatch(updateSearchResult());
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(addUserFailure(err.response.data.error));
      }
    });
  }
}