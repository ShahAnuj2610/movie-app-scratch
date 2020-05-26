import AppConstants from '../utils/constants';

const initialProductState = {
  error: undefined,
  product: undefined,
  loading: false,
};

function product(state = initialProductState, action) {
  switch (action.type) {
    case AppConstants.PRODUCT.GET:
      return {
        ...initialProductState,
        loading: true,
      };
    case AppConstants.PRODUCT.GET_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case AppConstants.PRODUCT.GET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default product;
