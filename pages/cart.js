import React from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { array, number, func } from 'prop-types';
import {
  Content, Footer, Header, Container,
} from '../components/Layout';
import Page from '../components/Page';
import { getTotalPrice } from '../modules/selectors';
import { removeToCart } from '../modules/actions/checkout';
import PurchaseButton from '../components/PurchaseButton';

const Cart = ({ items, totalPrice, removeFromCart }) => (
  <Container>
    <Header />
    <Content style={{ minHeight: 'calc(100vh - 135px)' }}>
      <div>
        <Card title={`My Cart(${items.length})`}>
          {items.map((item) => (
            <div key={item._id} style={{ padding: 20, borderBottom: 'solid 1px #E8E8E8' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${get(item, '_source.poster_path')
                || get(item, 'poster_path')}`}
                alt={get(item, '_source.original_title') || get(item, 'original_title')}
                style={{
                  height: 150,
                  alignSelf: 'flex-start',
                  cursor: 'pointer',
                }}
              />

              <div style={{ marginLeft: 20 }}>
                <h2>{get(item, '_source.original_title') || get(item, 'original_title')}</h2>
                <h2>{`$${get(item, '_source.price') || get(item, 'price')}`}</h2>
                <Button
                  style={{
                    marginTop: 30,
                    width: 100,
                  }}
                  onClick={() => removeFromCart(get(item, '_id'))}
                  type="danger"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </Card>
        <Card meta={<Button>Checkout</Button>} title="Total Price">
          <div>
            <h2>Total:</h2>
            <h2>{`$${totalPrice}`}</h2>
          </div>
          <PurchaseButton price={totalPrice}>
            <Button style={{ width: '100%', marginTop: 20 }}>Checkout</Button>
          </PurchaseButton>
        </Card>
      </div>
    </Content>
    <Footer />
  </Container>
);

Cart.propTypes = {
  items: array,
  totalPrice: number,
  removeFromCart: func,
};

const mapStateToProps = (state) => ({
  items: get(state, 'checkout.items'),
  totalPrice: getTotalPrice(state),
});
const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeToCart(id)),
});

export default Page(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Cart),
);
