import axios from 'axios';

axios.defaults.baseURL = 'http://api.soyabliq.uz/api';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';

const apiMethods = (method, url, token) => {
    
};

export default apiMethods;