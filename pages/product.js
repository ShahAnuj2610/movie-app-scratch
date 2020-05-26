import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
array, func, number, object, oneOfType, string,
} from 'prop-types';
import {
 Container, Content, Footer, Header,
} from '../components/Layout';
import Page from '../components/Page';
import PurchaseButton from '../components/PurchaseButton';
import { addToCart } from '../modules/actions/checkout';
import { fetchProduct } from '../modules/actions/product';

class Product extends React.Component {
  handleBuy = () => {
    const { product, handleAddToCart } = this.props;
    handleAddToCart(product);
  };

  render() {
    const {
      productImage,
      title,
      price,
      releaseYear,
      genresData,
      voteAverage,
      overview,
    } = this.props;
    return (
      <Container>
        <Header />
        <Content>
          <div>
            <div>
              <img alt={title} src={productImage} />
            </div>
            <div>
              <h2>{title}</h2>
              <br />
              <h3>{`${releaseYear}  |  ${(genresData || '').toString().replace(/,/g, ', ')}`}</h3>
              <h3>{`Rating: ${voteAverage}`}</h3>
              <div>{overview}</div>
              <div>{`$${price}`}</div>
              <div>
                <PurchaseButton price={price}>
                  <Button onClick={this.handleBuy}>Purchase</Button>
                </PurchaseButton>
                <Button onClick={this.handleBuy}>ADD TO CART</Button>
              </div>
            </div>
          </div>
        </Content>
        <Footer />
      </Container>
    );
  }
}
Product.propTypes = {
  handleAddToCart: func,
  product: object,
  productImage: oneOfType([string, number]),
  title: string,
  price: oneOfType([string, number]),
  releaseYear: oneOfType([string, number]),
  genresData: oneOfType([string, array]),
  voteAverage: number,
  overview: string,
};

const mapStateToProps = (state) => {
  const productData = get(state, 'product.product', {});
  const {
vote_average, poster_path, release_year, overview, price, genres_data, original_title,
} = productData._source || {};
  return {
    productImage: `https://image.tmdb.org/t/p/w500${poster_path}`,
    title: original_title,
    price,
    releaseYear: release_year,
    genresData: genres_data,
    voteAverage: vote_average,
    overview,
    product: productData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleAddToCart: (product) => dispatch(addToCart(product)),
});

export default Page(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Product),
  async (req, { dispatch }) => {
    const product = dispatch(fetchProduct(req.query.id));
    await Promise.all([product]);
    return null;
  },
);
