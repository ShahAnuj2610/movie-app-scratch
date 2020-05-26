import createAction from '../utils/actionCreator';
import AppConstants from '../utils/constants';

export function addToCart(product) {
  return createAction(AppConstants.CHECKOUT.ADD_PRODUCT, product);
}
export function removeToCart(productId) {
  return createAction(AppConstants.CHECKOUT.REMOVE_PRODUCT,
    productId);
}
