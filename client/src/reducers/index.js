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
import groupList from './group/list';
import groupListLoading from './group/listLoading';
import createdGroup from './group/created';
import selectedGroup from './group/selected';
import groupMessages from './group/messages';
import groupMessagesLoading from './group/messagesLoading';
import groupMessagesFailed from './group/messagesFailed';
import groupUsers from './group/users';
import inGroupPage from './group/inGroupPage';
import userSearchTerm from './search/term';
import userSearchResults from './search/results';

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
