import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://to-do-list-d7ffd-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;