import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { MusicPlayer } from './MusicPlayer';
import { useRef } from 'react';
import App from '../../../App';
import "./rockCard.css"
import "./rock.css"
export function Rock() {
  const RockmusicUrl = 'http://localhost:3001/rock';
  const [musicDataRock, setMusicRock] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialSongs, setInitialSongs] = useState([]);
  const { auth } = useContext(AuthContext);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [currentAudioRef, setCurrentAudioRef] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  useEffect(() => {
    fetch(RockmusicUrl, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
      .then(response => response.json())
      .then((musicFromServerRock) => {
        setMusicRock(musicFromServerRock);
        setInitialSongs(musicFromServerRock);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const searchParts = searchTerm.split(" ");
    const filteredSongs = initialSongs.filter((song) => 
      searchParts.every((part) => 
        song.title.toLowerCase().includes(part) || song.subtitle.toLowerCase().includes(part)
      )
    );
    setMusicRock(filteredSongs);
  }, [searchTerm, initialSongs]);
  
  function searchInputHandler(event){
    setSearchTerm(event.target.value.toLowerCase());
  }
  

  function handleRockCardClick(songUrl, audioRef, title, subtitle, avatar) {
    setCurrentSongUrl(songUrl);
    setCurrentAudioRef(audioRef);
    setCurrentTitle(title);
    setCurrentSubtitle(subtitle);
    setCurrentAvatar(avatar);
  }

  return (
    <section className='Pop_music_list_section'>
     <p className='user'>Hello, {auth.user.email}</p>

      <input type='text' id='search' onChange={searchInputHandler} placeholder='Search'></input>
      <ul className='Pop_music_list_container'>
        {musicDataRock.map((musicDataRock) => {
          return (
            <RockCardComponent
              key={musicDataRock.key}
              title={musicDataRock.title}
              subtitle={musicDataRock.subtitle}
              id={musicDataRock.id}
              songUrl={musicDataRock.uri}
              avatar={musicDataRock.avatar}
              onRockCardClick={handleRockCardClick}
            />
          );
        })}
      </ul>
      <MusicPlayer 
        songUrl={currentSongUrl} 
        audioRef={currentAudioRef} 
        title={currentTitle}
        subtitle={currentSubtitle} 
        avatar={currentAvatar}
      />
    </section>
  );
}

function RockCardComponent(props) {
  const { title, subtitle, avatar, id, songUrl, onRockCardClick } = props;
  const audioRef = useRef(null);
  const [favorite, setFavorite] = useState(false);
  
  const Favorite = () => {
    const body = {
      title: title,
      subtitle: subtitle,
      avatar: avatar,
      uri: songUrl,
    };
    fetch('http://localhost:3001/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(() => setFavorite(true))
      .catch(err => console.error(err));
  };

  function handleClick() {
    onRockCardClick(songUrl, audioRef, title, subtitle, avatar);
  }

  return (
    <li className='Pop_music_card_container' >
      <article className='Pop_music_card'>
        <img src={avatar} alt="Pop_Song Avatar" className='Pop_avatar' onClick={handleClick}/>
        <Link to={`/RockMusicDetails/${id}`}>
          <span className='Pop_music_card_title'>{title} - </span>
          <span className='Pop_music_card_subtitle'>{subtitle}</span>
        </Link>
        <button onClick={Favorite}>
          ❤️
        </button>
      </article>
    </li>
  );
}