import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../../contexts/Context';
import playIcon from '../../assets/play.svg';
import pauseIcon from '../../assets/pause.svg';
import './index.scss';

const MusicCard = ({track, duration}) => {
  const {playingNow, setPlayingNowTo, isPlaying, playPause} = useContext(Context);

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
    <div className="music-card">
      <div className="music-img" style={{backgroundImage: `url(${track.album.cover_medium})`}} alt={track.title}>
        <div className={playingNow?.id === track.id && isPlaying ? 'img-overlay mouse-entered' : 'img-overlay'}>
          <img
            onClick={handlePlay}
            className="play-btn"
            src={playingNow?.id === track.id && isPlaying ? pauseIcon : playIcon}
            alt="Play-Pause"
          />
          <a href={track.link} className="music-open-link" target="_blank" rel="noopener noreferrer">
            Open in Deezer
          </a>
        </div>
      </div>
      <div className="music-meta">
        <span className="music-name">{track.title}</span>
        <span className="music-artist">
          From:{' '}
          <Link className="link" to={'/artist/' + track.artist.id}>
            {track.artist.name}
          </Link>
        </span>
        <span className="music-album">
          In:{' '}
          <Link className="link" to={'/album/' + track.album.id}>
            {track.album.title}
          </Link>
        </span>
        <span className="music-duration">
          Duration: <span>{duration}</span>
        </span>
      </div>
    </div>
  );
};

export default MusicCard;
