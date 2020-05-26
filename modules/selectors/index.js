import { createSelector } from 'reselect';
import get from 'lodash/get';

const items = (state) => get(state, 'checkout.items', []);

const calcTotalPrice = ($items = []) => {
  let total = 0;
  $items.forEach((element) => {
    total += get(element, '_source.price') || get(element, 'price');
  });
  return total;
};

const getTotalPrice = createSelector(
  items,
  calcTotalPrice,
);

export { getTotalPrice };
