import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Purchase from '../PurchaseButton';
import Page from '../Page';
import { addToCart } from '../../modules/actions/checkout';

const ProductCard = ({
  id,
  originalTitle,
  genresData,
  releaseYear,
  posterPath,
  overview,
  price,
  product,
                       handleAddToCart,
}) => (
  <div key={id}>
    <div>
      <img
        style={{
          width: 240,
          height: 360,
        }}
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={originalTitle}
      />
    </div>
    <div>
      <div>
        <h2>{originalTitle}</h2>
        <h3>
{`${releaseYear}  |  ${genresData
          .toString()
          .replace(/,/g, ',  ')}`}
        </h3>
        <div>{overview}</div>
      </div>
      <div justifyContent="space-between">
        <h2>{`$${price}`}</h2>
        <Purchase>Purchase</Purchase>
        <button onClick={() => handleAddToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  </div>
);
ProductCard.propTypes = {
  id: PropTypes.number,
  originalTitle: PropTypes.string,
  genresData: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  releaseYear: PropTypes.string,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  price: PropTypes.number,
};
const mapDispatchToProps = (dispatch) => ({
  handleAddToCart: (product) => dispatch(addToCart(product)),
});
export default Page(connect(null, mapDispatchToProps)(ProductCard));
