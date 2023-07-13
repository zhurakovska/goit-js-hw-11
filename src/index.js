import Notiflix from 'notiflix';
import makeGalleryCard from './gallery-card.hbs'
import {Pixabay} from './pixabay-api'
import "simplelightbox/dist/simple-lightbox.min.css";

const listEl = document.querySelector('.gallery')
const searchFormEl = document.querySelector('.search-form')
const loadMoreBtnEl = document.querySelector('.btn-load-more')


const pixabay = new Pixabay();

const onLoadMoreBtnClick = async () => {
    try {
        pixabay.page +=1

        const response = await pixabay.axiosPhotos()
        const {hits, total, totalHits} = response.data
        const totalPage = Math.ceil(totalHits / 40)
    
        const galleryMarkup = makeGalleryCard(hits)
        listEl.insertAdjacentHTML('beforeend', galleryMarkup)
        pixabay.lightbox.refresh();

        if (totalPage === pixabay.page) {
            removeBtnLoadMore()
        }
    
        const { height: cardHeight } = document
            .querySelector('.gallery')
            .lastElementChild.getBoundingClientRect();
    
            window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
      });    

    } catch(error) {
        console.log(error)
    }
}

const onSearchFormSubmit = async event => {
    event.preventDefault()
    const searchQuery = event.currentTarget.elements.searchQuery.value
    pixabay.searchQuery = searchQuery
    pixabay.page = 1;

    try{
        
        const response = await pixabay.axiosPhotos()
        const {hits, total, totalHits} = response.data

        const totalPage = Math.ceil(totalHits / 40)

            if(totalHits > 0) {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            }

            if(totalPage === 0) {
                removeBtnLoadMore()
                listEl.innerHTML = ''
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return
            }

            if(totalPage === 1) {
                const galleryMarkup = makeGalleryCard(hits)
                listEl.innerHTML = galleryMarkup
                removeBtnLoadMore()
                return
            }
            
            const galleryMarkup = makeGalleryCard(hits)
            listEl.innerHTML = galleryMarkup
            pixabay.lightbox.refresh();
            addBtnLoadMore()
            
    } catch (error) {
        console.log('Unfortunately, we could not find anything for your request')
    }

}  

const removeBtnLoadMore = (event) => (
    loadMoreBtnEl.classList.add('is-hidden'),
    loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick),
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.'),
);

const addBtnLoadMore = () => {
    loadMoreBtnEl.classList.remove('is-hidden'),
    loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick)
}

searchFormEl.addEventListener('submit', onSearchFormSubmit)