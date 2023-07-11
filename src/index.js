import axios from "axios";
// import Notiflix from 'notiflix';
import makeGalleryCard from './gallery-card.hbs'
import {Pixabay} from './pixabay-api'

const listEl = document.querySelector('.gallery')
const searchFormEl = document.querySelector('.search-form')
const loadMoreBtnEl = document.querySelector('.btn-load-more')

const pixabay = new Pixabay();

const onLoadMoreBtnClick = async (event) => {
    try {
        pixabay.page +=1

        const response = await pixabay.axiosPhotos()
        const {hits, total, totalHits} = response.data
        const totalPage = Math.ceil(totalHits / 40)
    
        const galleryMarkup = makeGalleryCard(hits)
        listEl.insertAdjacentHTML('beforeend', galleryMarkup)
        if (totalPage === pixabay.page) {
            loadMoreBtnEl.classList.add('is-hidden')
            loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick)
        }

    } catch(error) {
        console.log(error)
    }
}

const onSearchFormSubmit = async event => {
    event.preventDefault()
    const searchQuery = event.currentTarget.elements.searchQuery.value
    pixabay.searchQuery = searchQuery

    try{
        const response = await pixabay.axiosPhotos()
        const {hits, total, totalHits} = response.data

        const totalPage = Math.ceil(totalHits / 40)
            console.log(totalPage)
            if(totalPage === 0) {
                loadMoreBtnEl.classList.add('is-hidden')
                loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick)
                listEl.innerHTML = ''
                throw new Error('Нажаль не змоглы знайти нчого по вашому запыту');
            }
            if(totalPage === 1) {
                const galleryMarkup = makeGalleryCard(hits)
                listEl.innerHTML = galleryMarkup
                loadMoreBtnEl.classList.add('is-hidden')
                loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick)
                return
            }
            
    
            const galleryMarkup = makeGalleryCard(hits)
            listEl.innerHTML = galleryMarkup
            loadMoreBtnEl.classList.remove('is-hidden')
            loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick)
    } catch (error) {
        console.log('Нажаль не змоглы знайти нчого по вашому запыту')
    }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit)