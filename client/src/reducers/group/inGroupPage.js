import { IN_GROUP_TRUE, IN_GROUP_FALSE } from '../../constants';

export default (state = false, action) => {
  switch (action.type) {
    case IN_GROUP_TRUE:
      return true;
    case IN_GROUP_FALSE:
      return false;
    default:
      return state;
  }
};
