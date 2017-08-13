import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api';

export { SIGNIN_SUCCESS, SIGNIN_FAILURE, signinUser } from './signinAction';
export { SIGNUP_SUCCESS, SIGNUP_FAILURE, signupUser } from './signupAction';
export { VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE, verifyAuth } from './verifyAuth';
export { LOGOUT_USER, logout } from './logoutAction';
export { GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE, getGroupList } from './getGroupsList';
export {} from './getGroupMessages';
export {} from './verifyAuth';



