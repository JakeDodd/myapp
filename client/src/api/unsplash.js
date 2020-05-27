import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 1cd1827eac37004bd1a4b801a1f823291ba40a66f31d1e74e307c3320f278974'
    }
});