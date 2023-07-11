import axios from "axios";

export class Pixabay {
    #BASE_URL = 'https://pixabay.com/api/'
    #API_KEY = '38181676-c389c3ce2b1eee7a286cf8f0e';

    constructor() {}

    axiosPhotos(){
        const searchParams = {
            key: this.#API_KEY,
            q: 'dog',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 20,
            page: 1
        };

        return axios.get(`${this.#BASE_URL}?`, { params: searchParams });
    };
}

