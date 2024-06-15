import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img key={index} src={image} alt="Dog" onClick={() => window.open(image, '_blank')} />
      ))}
    </div>
  );
};

export default Gallery;