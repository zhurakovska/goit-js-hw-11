import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export class Pixabay {
    #BASE_URL = 'https://pixabay.com/api/'
    #API_KEY = '38181676-c389c3ce2b1eee7a286cf8f0e';

    constructor() {
        this.searchQuery = ''
        this.page = 1
        // this.totalPage = 0;
        this.lightbox = new SimpleLightbox(".gallery a", {
            captionDelay: 250,
            captionsData: "alt"
        });
    }

    axiosPhotos(){
        const searchParams = {
            key: this.#API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: this.page
        };

        return axios.get(`${this.#BASE_URL}?`, { params: searchParams })
        // .then(response => {
        //     const { totalHits } = response.data; 
        //     this.totalPage = Math.ceil(totalHits / 20); 
        //     return response 
        // });
    };
}

