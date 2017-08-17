import { combineReducers } from 'redux';
import user from './setUserReducer';
import isAuthenticated from './authReducer';
import token from './setTokenReducer';
import groupList from './groupListReducer';
import selectedGroup from './selectedGroupReducer';
import groupMessages from './groupMessagesReducer';
import groupMessagesLoading from './groupMessagesLoading'

export default combineReducers({
  user,
  isAuthenticated,
  token,
  groupList,
  selectedGroup,
  groupMessages,
  groupMessagesLoading
})
