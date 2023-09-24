import { useEffect, useState, useRef } from 'react';

import { Searchbar } from '../components/Searchbar/Searchbar';
import { Layout } from './Layout';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { fetchPictures } from './services/api';
import { Loader } from './Loader/Loader';

import { AppWrapp } from './App.styled';




export const App = () => {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoadding] = useState(false);
  const perPage = 12;

  const intervalId = useRef(null);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const newQuery = event.target.elements.query.value;

    if (newQuery === "") {
      return Notify.warning('Search field is empty. Please, enter your request');
    }

    setQuery(`${nanoid()}/${newQuery}`);
    setPage(1);
    setImages([]);
    setTotalPages(0);

  }

  const sliceQuery = (query) => {
    return query.split('/')[1];
  }


  const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  const controllerRef = useRef();

  useEffect(() => {

    if (query === '') return;

    async function getImages() {

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();
      try {

        if (page === 1) {
          setLoadding(true);



          const data = await fetchPictures(sliceQuery(query), page, controllerRef);
          const allPages = Math.ceil(data.totalHits / perPage);

          if (data.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
            return;
          }
          setImages(data.hits);
          setTotalPages(allPages);
        }

        if (page !== 1) {
          setLoadding(true);
          const data = await fetchPictures(sliceQuery(query), page, controllerRef);

          setImages(images => [...images, ...data.hits]);
          intervalId.current = setTimeout(() => scroll(), 100);
        }
      }
      catch (error) {
        console.log(error.message);
      }
      finally {
        setLoadding(false);
      }

      return () => {
        clearInterval(intervalId.current);
      }
    }
    getImages();
  }, [query, page, perPage]);


  return (
    <>
      <AppWrapp>
        <Searchbar onSubmit={handleSubmit} />
        <Layout>
          {images.length > 0 && <ImageGallery images={images} />}
          {loading ?
            (<Loader />)
            : (page < totalPages && <Button onClick={loadMore} />)
          }
        </Layout>
      </AppWrapp>
    </>
  );


}