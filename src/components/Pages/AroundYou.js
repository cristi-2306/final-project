import React from "react";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../App";
import App from "../../App";
import { useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';


export function AroundYou() {
  const AROUNDMusicUrl = 'http://localhost:3001/around';
  const [musicDataAround, setMusicAround] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialSongs, setInitialSongs] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(AROUNDMusicUrl, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
      .then(response => response.json())
      .then((musicFromServerA) => {
        setMusicAround(musicFromServerA);
        setInitialSongs(musicFromServerA);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const searchParts = searchTerm.split(" ");
    const filteredSongs = initialSongs.filter((songs) => 
      searchParts.every((part) => 
        songs.title.toLowerCase().includes(part) || songs.subtitle.toLowerCase().includes(part)
      )
    );
    setMusicAround(filteredSongs);
  }, [searchTerm]);
  function searchInputHandler(event){
    setSearchTerm(event.target.value.toLowerCase());
  }


  return (
    <section className='Fav_music_list_section'>
<header className="fav_header">Around You</header>
<label htmlFor='search'>Search</label>
      <input type='text' id='searchTop' onChange={searchInputHandler} className='topChartsSearch'></input>
      <ul className='Fav_music_list_container'>
        {musicDataAround.map((musicDataAround) => {
          return (
            <AroundCardComponent
              key={musicDataAround.key}
              title={musicDataAround.title}
              subtitle={musicDataAround.subtitle}
              id={musicDataAround.id}
              songUrl={musicDataAround.uri}
              avatar={musicDataAround.avatar}
            />
          );
        })}
      </ul>
    </section>
  );
}

function AroundCardComponent(props) {
  const { title, subtitle, avatar, id, songUrl } = props;
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    audioRef.current.currentTime = event.target.value;
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }

  return (
    <li className='Fav_music_card_container'>
      <article className='Fav_music_card'>
        <img src={avatar} alt="Fav_Song Avatar" className='Fav_avatar' />
          <span className='Fav_music_card_title'>{title} - </span>
          <span className='Fav_music_card_subtitle'>{subtitle}</span>
        <button onClick={handlePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <audio ref={audioRef} src={songUrl} onTimeUpdate={handleTimeUpdate} />
        <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
        <span className="time">{Math.round(duration - currentTime)} time left</span>
      </article>
    </li>
  );
}

export default AroundYou;