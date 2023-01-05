import React from "react";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../App';
import App from "../../../App";
import { useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import './Fav.css';
export function Favourites() {
  const FavouritesMusicUrl = 'http://localhost:3001/favourites';
  const [musicDataFavorites, setMusicFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialSongs, setInitialSongs] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(FavouritesMusicUrl, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
      .then(response => response.json())
      .then((musicFromServerFavourites) => {
        setMusicFavorites(musicFromServerFavourites);
        setInitialSongs(musicFromServerFavourites);
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
    setMusicFavorites(filteredSongs);
  }, [searchTerm]);
  function searchInputHandler(event){
    setSearchTerm(event.target.value.toLowerCase());
  }


  return (
    <section className='Fav_music_list_section'>
<header className="fav_header">Favorites</header>
<label htmlFor='search'>Search</label>
      <input type='text' id='searchFav' onChange={searchInputHandler}></input>
      <ul className='Fav_music_list_container'>
        {musicDataFavorites.map((musicDataFavorites) => {
          return (
            <FavoritesCardComponent
              key={musicDataFavorites.key}
              title={musicDataFavorites.title}
              subtitle={musicDataFavorites.subtitle}
              id={musicDataFavorites.id}
              songUrl={musicDataFavorites.uri}
              avatar={musicDataFavorites.avatar}
            />
          );
        })}
      </ul>
    </section>
  );
}

function FavoritesCardComponent(props) {
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

  const handleDelete = () => {
    fetch(`http://localhost:3001/favourites/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        window.location.reload();
      }) 
      .catch(err => console.error(err));
  };

  return (
    <li className='Fav_music_card_container'>
      <article className='Fav_music_card'>
        <img src={avatar} alt="Fav_Song Avatar" className='Fav_avatar' />
          <span className='Fav_music_card_title'>{title} - </span>
          <span className='Fav_music_card_subtitle'>{subtitle}</span>
        <button onClick={handlePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleDelete}>
          ❌
        </button>
        <audio ref={audioRef} src={songUrl} onTimeUpdate={handleTimeUpdate} />
        <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
        <span className="time">{Math.round(duration - currentTime)} time left</span>
      </article>
    </li>
  );
}

export default Favourites;