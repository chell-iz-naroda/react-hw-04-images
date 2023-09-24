import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '?key=35797835-5db75a5f3a658babe088000e6';


export const fetchPictures = async (query, page, controllerRef) => {

    const API_SEARCH_PARAMS = {
        image_type: 'photo',
        per_page: 12,
        page,
        q: query,
    };
    const response = await axios.get(API_KEY, { params: API_SEARCH_PARAMS, signal: controllerRef.current.signal});
    return response.data;
};
