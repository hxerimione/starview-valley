import axios from 'axios';

const API_ENDPOINT = 'https://api.themoviedb.org/3';
const LANGUAGE = 'language=ko-KO&page=1';
const REQUEST_ERROR = {
    500: { msg: '요청실패' },
};

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// axios.defaults.headers.common['Authorization'] =
//     'Bearer ' + process.env.REACT_APP_AUTHORIZATION_KEY;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const request = async (url) => {
    try {
        //응답 성공
        const response = await axios.get(url, {
            headers: {
                Authorization:
                    'Bearer ' + process.env.REACT_APP_AUTHORIZATION_KEY,
                accept: 'application/json',
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        //응답 실패
        console.log('hi');
        console.error(error);
    }
    // fetch(url).then((res) => {
    //     return res.json();
    // });
};

export const api = {
    //search
    getSearch: (media, keyword) => {
        return request(
            `${API_ENDPOINT}/search/${media}/${keyword}?${LANGUAGE}`
        );
    },
    getTrending: (media) => {
        return request(`${API_ENDPOINT}/trending/${media}/week?${LANGUAGE}`);
    },
    getPopular: (media) => {
        return request(`${API_ENDPOINT}/${media}/top_rated?${LANGUAGE}`);
    },
    getDetail: (media, id) => {
        return request(`${API_ENDPOINT}/${media}/${id}?${LANGUAGE}`);
    },
};

export default request;
