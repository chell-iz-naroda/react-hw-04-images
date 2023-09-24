import { Component } from 'react';

import { Searchbar } from '../components/Searchbar/Searchbar';
import { Layout } from './Layout';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { fetchPictures } from './services/api';
import { Loader } from './Loader/Loader';

import { AppWrapp } from './App.styled';



export class App extends Component {


  state = {
    images: [],
    query: '',
    page: 1,
    totalPages: 0,
    loading: false,
    perPage: 12,
  }



  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = (event) => {

    event.preventDefault();

    const newQuery = event.target.elements.query.value;

    if (newQuery === "") {
      return Notify.warning('Search field is empty. Please, enter your request');
    }

    this.setState({
      query: `${nanoid()}/${newQuery}`,
      page: 1,
      images: [],
      totalPages: 0,
    });

  }

  sliceQuery = (query) => {
    return query.split('/')[1];
  }

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };


  async componentDidUpdate(prevProps, prevState) {
    try {
      const { query, page, perPage } = this.state;
      const sliceQuery = this.sliceQuery(query);

      if (
        (prevState.query !== query || prevState.page !== page) && page === 1
      ) {
        this.setState({ loading: true });

        const data = await fetchPictures(sliceQuery, page);

        const allPages = Math.ceil(data.totalHits / perPage);

        if (data.totalHits === 0) {
          Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
          this.setState({ loading: false });
          return;
        }
        this.setState({ images: data.hits, totalPages: allPages, loading: false });
      }

      if (
        (prevState.query !== query || prevState.page !== page) && page !== 1
      ) {
        this.setState({ loading: true });
        const data = await fetchPictures(sliceQuery, page);

        this.setState(({ images }) => ({ images: [...images, ...data.hits], loading: false }));
        setTimeout(() => this.scroll(), 100);
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  render() {

    const { images, page, totalPages, loading } = this.state;

    return (
      <>
        <AppWrapp>
          <Searchbar onSubmit={this.handleSubmit}/>
          <Layout>
            {images.length > 0 && <ImageGallery images={images} />}
            {loading ?
              (<Loader />)
              : (page < totalPages && <Button onClick={this.loadMore} />)
            }
          </Layout>
        </AppWrapp>
      </>
    );
  }


}