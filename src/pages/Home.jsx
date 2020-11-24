import React, {useState} from 'react';
import SearchBar from '../components/SearchBar';
import ResultMusics from '../components/ResultMusics';

const URL = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
const KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [results, setResults] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');

  const startSearch = async txt => {
    setResults([]);
    setSearchTxt(txt);

    await fetch(URL + txt, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": KEY
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch(console.error);
  }

  return (
    <div>
      <SearchBar startSearch={startSearch} />
      <ResultMusics resultData={results} searchTxt={searchTxt} />
    </div>
  )
}

export default Home;
