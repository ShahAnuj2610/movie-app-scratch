import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';

const Image = ({
                 src, alt, placeholderStyle, ...props
               }) => (
  <ProgressiveImage src={src} placeholder="">
    {(currentSrc, loading) => (loading ? (
      <div style={{ background: '#040203', ...placeholderStyle }} {...props} />
    ) : (
      <img src={currentSrc} alt={alt} {...props} />
    ))}
  </ProgressiveImage>
);
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  placeholderStyle: PropTypes.object,
};

export default Image;
