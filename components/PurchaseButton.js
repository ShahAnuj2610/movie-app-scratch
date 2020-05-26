import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

const onToken = (token) => {
  console.log('Stripe Token', token);
};

const Purchase = ({
 price, title, children, ...props
}) => (
  <StripeCheckout
    name="MoviesStore@appbase.io"
    description={title}
    token={onToken}
    amount={price * 100}
    stripeKey="pk_test_DYtAxDRTg6cENksacX1zhE02"
  >
    {children || <span {...props}>PURCHASE</span>}
  </StripeCheckout>
);
Purchase.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Purchase;
