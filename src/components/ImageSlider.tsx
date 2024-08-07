import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardMedia } from '@mui/material';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider
      dots={settings.dots}
      infinite={settings.infinite}
      speed={settings.speed}
      slidesToShow={settings.slidesToShow}
      slidesToScroll={settings.slidesToScroll}
    >
      {images.map((image, index) => (
        <CardMedia
          key={image}
          component="img"
          image={image}
          alt={`Product Image ${index + 1}`}
          sx={{
            width: '100%',
            height: '500px',
            objectFit: 'cover',
            display: 'block',
            margin: 'auto',
          }}
        />
      ))}
    </Slider>
  );
};

export default ImageSlider;
