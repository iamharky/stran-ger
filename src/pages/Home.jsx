import React from 'react';
import SearchBar from '../components/SearchBar';
import ResultMusics from '../components/ResultMusics';
import PopularMusics from '../components/PopularMusics';

const Home = () => {
  return (
    <>
      <SearchBar />
      <ResultMusics />
      <PopularMusics />
    </>
  );
};

export default Home;
