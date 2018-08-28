import axios from 'axios';

const instance = axios.create({
    baseURL: "https://my-burger-app-e151c.firebaseio.com/"
});

export default instance;