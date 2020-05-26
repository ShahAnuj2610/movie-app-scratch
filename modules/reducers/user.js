import AppConstants from '../utils/constants';

const initialUserState = {
  user: undefined,
};
function user(state = initialUserState, action) {
  switch (action.type) {
    case AppConstants.USER.LOGIN:
      return {
        ...initialUserState,
        user: action.payload,
      };
    case AppConstants.USER.LOGOUT:
      return { ...initialUserState };
    default:
      return state;
  }
}
export default user;
