import React, {useState} from 'react';
import searchIcon from '../assets/search.svg';
import './searchbar.scss';

const SearchBar = ({startSearch}) => {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const setText = (e) => setSearchText(e.target.value);

  const runSearch = () => {
    setFocused(false);
    searchText !== '' && startSearch(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      runSearch();
    };
  }

  return (
    <div id="search-bar-wrapper">
      <div id="search-bg" className={focused ? 'img-on-focused' : ''}/>
      <div id="search-bar" onKeyDown={handleKeyDown} className={focused ? 'focused' : ''}>
        <input
          type="text"
          onChange={setText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchText}
          placeholder="Search for music..." />
        <img onClick={runSearch} src={searchIcon} alt="Search icon"/>
      </div>
    </div>
  )
}

export default SearchBar;
