import React, {useEffect, useReducer} from 'react';
import popularReducer, {initialState} from '../reducers/popularReducer';
import fetchData from '../fetchData';
import MusicCard from './MusicCard';
import MusicCardPlaceholder from './placeholders/MusicCardPlaceholder';

const PopularMusics = () => {
  const [state, dispatch] = useReducer(popularReducer, initialState);

  useEffect(() => {
    // 12 = 2x, 3y, 4z (for responsiveness)
    fetchData('editorial/0/charts?limit=12')
      .then((res) => dispatch({type: 'ON_SUCCESS', data: res.tracks.data}))
      .catch(() => dispatch({type: 'ON_FAILURE'}));
  }, []);

  const results = state.popularNow.map((track) => {
    let minutes = Math.floor(track.duration / 60).toString();
    let seconds = (track.duration % 60).toString();
    let duration = `${minutes.length === 1 ? '0' + minutes : minutes}:${
      seconds.length === 1 ? '0' + seconds : seconds
    }`;
    return <MusicCard key={track.id} track={track} duration={duration} />;
  });

  if (state.error === '') {
    return (
      <>
        <h2 className="result-section-header">Popular Now</h2>
        {state.loading ? (
          <div className="result-section">
            <MusicCardPlaceholder />
            <MusicCardPlaceholder />
            <MusicCardPlaceholder />
            <MusicCardPlaceholder />
          </div>
        ) : (
          <div className="result-section">{results}</div>
        )}
      </>
    );
  } else {
    return <span className="search-error">{state.error}</span>;
  }
};

export default PopularMusics;
