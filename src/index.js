import axios from "axios";
// import Notiflix from 'notiflix';

import {Pixabay} from './pixabay-api'

const pixabay = new Pixabay();

pixabay.axiosPhotos().then(response => {
    console.log(response.data.hits)
  })
  .catch(error => {
    // console.log(error);
});
