import axios from 'axios';

const request = (url, header) => axios(url, header);

export default request;
