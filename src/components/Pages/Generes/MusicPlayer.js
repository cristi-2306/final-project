
import { useState } from "react";
import '@fortawesome/fontawesome-free/js/all.js';
import { FaPlay, FaPause } from 'react-icons/fa';
import "./musicPlayer.css"

export function MusicPlayer(props) {
  const { songUrl, audioRef, title, subtitle, avatar } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 

  function togglePlay() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setShowAvatar(true); 
    }
  }

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleSeek(event) {
    audioRef.current.currentTime = event.target.value;
  }

  function handleLoadedData() {
    setDuration(audioRef.current.duration);
  }

  return (
    <div className="music-player">
      <div className="music-player_song-title">{title}</div>
      <div className="music-player_song-subtitle">{subtitle}</div>
      <audio ref={audioRef} src={songUrl} onTimeUpdate={handleTimeUpdate} onLoadedData={handleLoadedData} />
      {showAvatar && <img src={avatar} alt="Pop_Song Avatar" className='music-player_Pop_avatar'/>} 
      <button onClick={togglePlay} className='player_btn'>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div className="music-player_seekbar-container">
        <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} className="music-player_seekbar" />
      </div>
    </div>
  );
}