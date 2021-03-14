import axios from 'axios';

// axios.defaults.baseURL = 'http://api.soyabliq.uz/api';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';

export const getRequest = (url, cToken) => {
    return axios
        .get(url, { cancelToken: cToken })
        .then(data => data)
        .catch(er => {
            console.error(er);
            if (axios.isCancel(er)) {
                console.error(er);
                alert('hehe');
            }
        });
};

export const postRequest = (url, cToken, body) => {

};