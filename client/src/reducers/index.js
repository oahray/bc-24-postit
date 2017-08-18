import { combineReducers } from 'redux';
import user from './setUserReducer';
import userLoading from './verifyAuthLoading';
import isAuthenticated from './authReducer';
import token from './setTokenReducer';
import authFormErrorMessage from './authFormErrorMessage';
import authFormFailed from './authFormFailed';
import groupList from './groupListReducer';
import groupListLoading from './groupListLoading';
import selectedGroup from './selectedGroupReducer';
import groupMessages from './groupMessagesReducer';
import groupMessagesLoading from './groupMessagesLoading';
import inGroupPage from './inGroupPageReducer';

export default combineReducers({
  user,
  userLoading,
  isAuthenticated,
  token,
  authFormFailed,
  authFormErrorMessage,
  groupList,
  groupListLoading,
  selectedGroup,
  groupMessages,
  groupMessagesLoading,
  inGroupPage
})
