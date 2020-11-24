import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import playIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import './music-card.scss';

const MusicCard = ({track, duration}) => {
  const [mouseEntered, setMouseEntered] = useState(false);

  const {playingNow, setPlayingNowTo, isPlaying, playPause} = useContext(Context);

  const handleMouseEnter = () => setMouseEntered(true);

  const handleMouseLeave = () => setMouseEntered(false);

  const handlePlay = () => {
    if (playingNow?.id === track.id) {
      // Play-Pause playingNow
      playPause();
    } else {
      // Reset to defaults and set new track
      // ** Normally, we should use 'duration' comes from props istead of '30',
      // ** Deezer allows us to play only 30 seconds for each track.
      setPlayingNowTo(track, '00:30');
    }
  };

  return (
    <div className="music-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="music-img"
        style={{backgroundImage: `url(${track.album.cover_medium})`}}
        alt={track.title}
      >
        <div className={(mouseEntered || ((playingNow?.id === track.id) && isPlaying)) ? 'img-overlay mouse-entered': 'img-overlay'}>
          <img
            onClick={handlePlay}
            className="play-btn"
            src={(playingNow?.id === track.id) && isPlaying ? pauseIcon : playIcon}
            alt="Play-Pause"/>
          <a
            href={track.link}
            className="music-open-link"
            target="_blank"
            rel="noopener noreferrer"
          >Open in Deezer</a>
        </div>
      </div>
      <div className="music-meta">
        <span className="music-name">{track.title}</span>
        <span className="music-artist">
          From: <a className="link" href={"/artist/" + track.artist.id}>{track.artist.name}</a> 
        </span>
        <span className="music-album">
          In: <a className="link" href={"/album/" + track.album.id}>{track.album.title}</a>
        </span>
        <span className="music-duration">
          Duration: <span>{duration}</span>
        </span>
      </div>
    </div>
  )
}

export default MusicCard;
