import { combineReducers } from 'redux';
import user from './auth/user/setUser';
import setUserLoading from './auth/user/loadingUser';
import verifyAuthLoading from './auth/status/authLoading';
import isAuthenticated from './auth/status/authStatus';
import verifyAuthFailed from './auth/status/authFailed';
import token from './auth/token/setToken';
import authFormErrorMessage from './auth/form/errorMessage';
import authFormLoading from './auth/form/requestLoading';
import authFormFailed from './auth/form/requestFailed';
import {
  requestResetLoading,
  requestResetMessage,
  resetPasswordLoading,
  resetPasswordError
} from './auth/user/resetPassword';
import groupList from './groupListReducer';
import groupListLoading from './groupListLoading';
import createdGroup from './createdGroup';
import selectedGroup from './selectedGroupReducer';
import groupMessages from './groupMessagesReducer';
import groupMessagesLoading from './groupMessagesLoading';
import groupMessagesFailed from './groupMessagesFailed';
import groupUsers from './groupUsers';
import inGroupPage from './inGroupPageReducer';
import userSearchTerm from './searchTerm';
import userSearchResults from './searchResults';

export default combineReducers({
  user,
  verifyAuthLoading,
  isAuthenticated,
  verifyAuthFailed,
  token,
  setUserLoading,
  authFormFailed,
  authFormLoading,
  authFormErrorMessage,
  groupList,
  groupListLoading,
  createdGroup,
  selectedGroup,
  groupMessages,
  groupMessagesLoading,
  groupMessagesFailed,
  groupUsers,
  inGroupPage,
  userSearchTerm,
  userSearchResults,
  requestResetLoading,
  requestResetMessage,
  resetPasswordLoading,
  resetPasswordError
});
