import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({
                       id,
                       originalTitle,
                       genresData,
                       releaseYear,
                       posterPath,
                       overview,
                       price,
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
        <h3>{`${releaseYear}  |  ${genresData.toString().replace(/,/g, ',  ')}`}</h3>
        <div>{overview}</div>
      </div>
      <div justifyContent="space-between">
        <h2>{`$${price}`}</h2>
      </div>
    </div>
  </div>
);
ProductCard.propTypes = {
  id: PropTypes.number,
  originalTitle: PropTypes.string,
  genresData: PropTypes.oneOfType([PropTypes.array,
    PropTypes.string]),
  releaseYear: PropTypes.string,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  price: PropTypes.number,
};
export default ProductCard;
