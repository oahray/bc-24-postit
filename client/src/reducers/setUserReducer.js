import { VERIFY_AUTH_SUCCESS, SIGNUP_SUCCESS, SIGNIN_SUCCESS, LOGOUT_USER } from '../actions';

export default function(state = null, action) {
  console.log('>>>>>>>>>>>>>> User Reducer Triggered! by:', action);
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.response.data.user
    case SIGNUP_SUCCESS:
      return action.response.data.user
    case VERIFY_AUTH_SUCCESS:
      return action.response.data.currentUser
    case LOGOUT_USER:
      return null
  }
  return state;
}