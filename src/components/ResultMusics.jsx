import React, {useEffect, useState} from 'react';
import MusicCard from './MusicCard';

const ResultMusics = ({resultData, searchTxt}) => {
  const [visibleResults, setVisibleResults] = useState([]);

  const loadMoreResults = () => {
    const rLen = resultData?.length;
    const vrLen = visibleResults.length;
    // If there are hidden results
    if (rLen > vrLen){
      // Show (up to) 8 more
      setVisibleResults(oldArr => [...oldArr, ...resultData.slice(vrLen, vrLen + 8)]);
    }
  }

  useEffect(() => {
    const rLen = resultData?.length || 0;
    const vrLen = visibleResults.length;
    // Load first 8 results
    if (rLen > 0 && vrLen === 0){
      loadMoreResults();
    }
    if (rLen === 0) {
      setVisibleResults([]);
    }
  }, [resultData]);

  const results = visibleResults.map(track => {
    let minutes = (Math.floor(track.duration/60)).toString();
    let seconds = (track.duration % 60).toString();
    let duration = `${minutes.length === 1 ? '0' + minutes : minutes}:${seconds.length === 1 ? '0' + seconds : seconds}`;
    return <MusicCard key={track.id} track={track} duration={duration} />
  });

  return (
    <>
      {searchTxt !== '' && resultData && <h2 className="result-section-header">Results for '{searchTxt}'</h2>}
      {searchTxt !== '' && !resultData && <h2 className="result-section-header">No results for '{searchTxt}'</h2>}
      {resultData && resultData !== [] && <div className="result-section">{results}</div>}
      {searchTxt !== '' && resultData && resultData?.length === 0 && <div className="loading"></div>}
      {resultData && resultData?.length != visibleResults.length && <p className="load-more" onClick={loadMoreResults}>Load more results...</p>}
    </>
  )
}

export default ResultMusics;
