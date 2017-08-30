import axios from 'axios';

export const BASE_URL = `http://${window.location.host}/api`;

export * from './signinAction';
export * from './signupAction';
export * from './clearFormError';
export * from './verifyAuth';
export * from './logoutAction';
export * from './createNewGroup';
export * from './getGroupsList';
export * from './getGroupMessages';
export * from './getGroupUsers';
export * from './searchUsers'
export * from './sendMessage'; 
export * from './inGroupPage';



