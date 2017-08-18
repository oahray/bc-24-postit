import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api';

export { SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_FAILURE, signinUser } from './signinAction';
export { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_FAILURE, signupUser } from './signupAction';
export { CLEAR_FORM_ERROR, clearFormError } from './clearFormError';
export { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE, verifyAuth } from './verifyAuth';
export { LOGOUT_USER, logout } from './logoutAction';
export { GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE, getGroupList } from './getGroupsList';
export { GET_GROUP_MESSAGES_LOADING, GET_GROUP_MESSAGES_SUCCESS, GET_GROUP_MESSAGES_FAILURE, getGroupMessages } from './getGroupMessages';
export {} from './verifyAuth';
export { IN_GROUP_TRUE, IN_GROUP_FALSE, inGroupPage } from './inGroupPage';



