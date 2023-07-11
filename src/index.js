import axios from "axios";
// import Notiflix from 'notiflix';
import makeGalleryCard from './gallery-card.hbs'
import {Pixabay} from './pixabay-api'

const listEl = document.querySelector('.gallery')
const searchFormEl = document.querySelector('.search-form')
const loadMoreBtnEl = document.querySelector('.btn-load-more')

const pixabay = new Pixabay();

const onLoadMoreBtnClick = (event) => {
    pixabay.page +=1

     pixabay.axiosPhotos()
    .then(response => {
        const {hits, total, totalHits} = response.data
        const galleryMarkup = makeGalleryCard(hits)
        listEl.insertAdjacentHTML('beforeend', galleryMarkup)
        console.log(total)
            
    }).catch(error => {
        console.log(error);
    });
    // if(  === pixabay.page) {
    //     loadMoreBtnEl.classList.add('is-hidden')
    //     loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick)
    // }
}

const onSearchFormSubmit = (event) => {
    event.preventDefault()
    const searchQuery = event.currentTarget.elements.searchQuery.value
    pixabay.searchQuery = searchQuery

    pixabay.axiosPhotos()
    .then(response => {
        const {hits, total, totalHits} = response.data
        const galleryMarkup = makeGalleryCard(hits)
        listEl.innerHTML = galleryMarkup
        loadMoreBtnEl.classList.remove('is-hidden')
        loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick)
        const perPage = (total/500) / 20
        console.log(perPage)
            
    }).catch(error => {
        console.log(error);
    });
        
}

searchFormEl.addEventListener('submit', onSearchFormSubmit)