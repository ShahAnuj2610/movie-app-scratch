import some from 'lodash/some';
import AppConstants from '../utils/constants';

const initialProductState = {
  items: [],
  totalPrice: 0,
};

const addItems = (items = [], payload) => {
  const newItems = items.map((item) => item);
  if (!some(items, (e) => e._id === payload._id)) {
    newItems.push(payload);
  }
  return newItems;
};
const removeItem = (items = [], id) => {
  const newItems = items.map((item) => item);
  newItems.every((e, index) => {
    if (e._id === id) {
      newItems.splice(index, 1);
      return false;
    }
    return true;
  });
  return newItems;
};

function checkout(state = initialProductState, action) {
  switch (action.type) {
    case AppConstants.CHECKOUT.ADD_PRODUCT:
      return {
        ...state,
        items: addItems(state.items, action.payload),
      };
    case AppConstants.CHECKOUT.REMOVE_PRODUCT:
      return {
        ...state,
        items: removeItem(state.items, action.payload),
      };

    default:
      return state;
  }
}

export default checkout;
