import { Component } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio.js";

import fetchImgs from "components/helpers/API";

import AppContainer from "./App.styled";
import Searchbar from "components/Searchbar/";
import ImageGallery from "components/ImageGallery";
import LoadMoreButton from "components/LoadMoreButton";
import Loader from "components/Loader";
import Modal from "components/Modal"

Notify.init({
    width: '300px',
    position: 'left-top',
    fontSize: '16px',    
});
export default class App extends Component {

  state = {
    query: '',
    page: 1,
    hits: [],
    selectedHit: null,
    loadMore: false,
    loader: false,
    isShowModal: false
  }

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state

    if (query === '') {
      Notify.warning("Error! You must specify a keyword to search for.")
      return
    }
         
    if (page !== prevState.page || query !== prevState.query) {

      try {
        this.setState({loader: true})
        let data = await fetchImgs(query, page)
        console.log('Hits:', data.hits);

        if (data.hits && data.hits.length > 0) {

          if (page === 1) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`)
          }
                            
          this.setState((prevState) => ({
            hits: [...prevState.hits, ...data.hits],
            loadMore: page < Math.ceil(data.totalHits / 12 )
          }))

        } else {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
      }

      catch (error) {
        console.error(error.message);
      }

      finally {
        this.setState({loader: false})
      }
      
    }
  }
  
  handleSearchbarSubmit = query => {
    console.log('query:', query)
    if (query === this.state.query) {
      Notify.warning("Error! You are already searching for this keyword.")
      return
    }
    
    this.setState({
      query,
      hits: [],
      page: 1,
      loadMore: false
    })
  }

  handleLoadMoreButton = _ => {
    this.setState((prevState) => ({ page: prevState.page + 1 }))
  }

  handleHitClick = ({ largeImageURL, tags }) => {
    this.setState(({ selectedHit: { largeImageURL, tags } }), () => console.log('selectedHit: ', this.state.selectedHit))
    this.toggleModal()
  }

  toggleModal = () => {
		this.setState((prevState) => ({
			isShowModal: !prevState.isShowModal,
		}))
	}

  render() {
      const {hits, loadMore, loader, isShowModal, selectedHit} = this.state
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {loader && <Loader/>}
          {hits.length > 0 && <ImageGallery hits={hits} onHitClick={this.handleHitClick} />}
          {isShowModal && <Modal selectedHit={selectedHit} hideModal={this.toggleModal}/>}
          {loadMore > 0 && <LoadMoreButton onLoadMoreButtonClick={this.handleLoadMoreButton} />}
        </AppContainer>  
      )
    }
  }