import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

import fetchImgs from 'components/helpers/API';

import AppContainer from './App.styled';
import Searchbar from 'components/Searchbar/';
import ImageGallery from 'components/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

Notify.init({
  width: '300px',
  position: 'left-top',
  fontSize: '16px',
});

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [selectedHit, setSelectedHit] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const fetchImages = async () => {
      try {
        setLoader(true);
        let data = await fetchImgs(query, page);
        console.log('Hits:', data.hits);

        if (data?.hits && data.hits?.length > 0) {
          if (page === 1) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`);
          }

          setHits(prevHits => [...prevHits, ...data.hits]);
          setLoadMore(page < Math.ceil(data.totalHits / 12));
        } else {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        Notify.failure(error.message);
        console.error(error.message);
      } finally {
        setLoader(false);
      }
    };

    if (query !== '') fetchImages();
  }, [query, page]);

  const handleSearchbarSubmit = newQuery => {
    if (query === newQuery) {
      Notify.warning('Error! You are already searching for this keyword.');
      return;
    }
    console.log('query:', newQuery);
    setQuery(newQuery);
    setHits([]);
    setPage(1);
    setLoadMore(false);
  };

  const handleLoadMoreButton = _ => {
    setPage(prevPage => prevPage + 1);
  };

  const handleHitClick = ({ largeImageURL, tags }) => {
    setSelectedHit({ largeImageURL, tags });
    toggleModal();
  };

  const toggleModal = () => {
    setIsShowModal(prevIsShowModal => !prevIsShowModal);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {loader && <Loader />}
      {hits.length > 0 && (
        <ImageGallery hits={hits} onHitClick={handleHitClick} />
      )}
      {isShowModal && (
        <Modal selectedHit={selectedHit} hideModal={toggleModal} />
      )}
      {loadMore > 0 && (
        <LoadMoreButton onLoadMoreButtonClick={handleLoadMoreButton} />
      )}
    </AppContainer>
  );
};

export default App;
