const URL = 'https://deezerdevs-deezer.p.rapidapi.com/';
const KEY = process.env.REACT_APP_API_KEY;
const CONFIG = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': KEY,
    'Retry-After': 6,
  },
};

const fetchData = (params) => fetch(URL + params, CONFIG).then((res) => res.json());

export default fetchData;
