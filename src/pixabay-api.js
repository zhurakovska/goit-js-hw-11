import axios from "axios";

export class Pixabay {
    #BASE_URL = 'https://pixabay.com/api/'
    #API_KEY = '38181676-c389c3ce2b1eee7a286cf8f0e';

    constructor() {
        this.searchQuery = ''
        this.page = 1
        // this.totalPage = 0;
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

