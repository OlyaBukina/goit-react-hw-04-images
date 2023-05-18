import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const { largeImageURL, webformatURL, tags } = image;

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };
  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal} bigImage={largeImageURL} alt={tags} />
      )}
      <GalleryItem onClick={toggleModal}>
        <GalleryImage src={webformatURL} alt={tags} />
      </GalleryItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
