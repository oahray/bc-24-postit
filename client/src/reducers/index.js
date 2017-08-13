import { combineReducers } from 'redux';
import setUserReducer from './setUserReducer';
import authReducer from './authReducer';
import setTokenReducer from './setTokenReducer';
import getGroupsReducer from './getGroupsReducer';

export default combineReducers({
  user: setUserReducer,
  isAuthenticated: authReducer,
  token: setTokenReducer,
  groupList: getGroupsReducer
})
