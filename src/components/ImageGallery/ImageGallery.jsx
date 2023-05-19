import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, page }) => {
  const galleryRef = useRef();

  useEffect(() => {
    function scroll() {
      const pageSize = 12;
      const targetItemIndex = (page - 1) * pageSize;
      const targetItem = galleryRef.current.children.item(targetItemIndex);
      const padding = 15;
      const headerHeight = 72;
      const currentScrollTop = document.scrollingElement.scrollTop;
      if (!targetItem) {
        return;
      }
      const targetItemScreenOffsetTop = targetItem?.getBoundingClientRect().top;

      window.scroll({
        top:
          currentScrollTop + targetItemScreenOffsetTop - padding - headerHeight,
        behavior: 'smooth',
      });
    }
    if (page > 1) {
      scroll();
    }
  });
  return (
    <Gallery ref={galleryRef}>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
