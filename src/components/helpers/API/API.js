import axios from 'axios';

export default async function fetchImgs(query, page) {
    const BASE_API_URL = 'https://pixabay.com/api/';
    const API_KEY = '40254298-f0122bcc19424dfed523c5016';        
         
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page,
    })

     return await axios.get(`${BASE_API_URL}`, {
        params,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(resp => {
            console.log('Fetch data: ', resp);
            if (!resp.status) {
                throw new Error(resp.status || resp.statusText);
            }
            return resp.data;                                             
        });
}; 