import createAction from '../utils/actionCreator';
import AppConstants from '../utils/constants';

export function login(user) {
  return createAction(AppConstants.USER.LOGIN, user);
}
export function logout() {
  return createAction(AppConstants.USER.LOGOUT);
}
