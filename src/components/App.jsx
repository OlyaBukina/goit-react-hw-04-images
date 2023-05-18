import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './Container.styled';
import { GlobalStyle } from '../GlobalStyles';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../services/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showBtnLoadmore, setShowBtnLoadmore] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImages(query, page);
        if (response.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setImages(prevImages => [...prevImages, ...response.hits]);
        setShowBtnLoadmore(response.hits.length > 11);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const getQuery = ({ query }) => {
    setQuery(query);
    setImages([]);
    setShowBtnLoadmore(false);
  };
  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <Container>
      <Searchbar onSubmit={getQuery} />

      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {showBtnLoadmore && <LoadMoreBtn incrementPage={incrementPage} />}

      <ToastContainer />
      <GlobalStyle />
    </Container>
  );
};
