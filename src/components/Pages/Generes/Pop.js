import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import PopMusicDetails from './PopMusicDetails';
import App from '../../../App';
import './popCard.css';
import './pop.css';
import { useRef } from 'react';
import { MusicPlayer } from './MusicPlayer';



export function Pop() {
  const PopMusicUrl = 'http://localhost:3001/pop';
  const [musicDataPop, setMusicPop] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialSongs, setInitialSongs] = useState([]);
  const { auth } = useContext(AuthContext);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [currentAudioRef, setCurrentAudioRef] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  useEffect(() => {
    fetch(PopMusicUrl, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
      .then(response => response.json())
      .then((musicFromServerPop) => {
        setMusicPop(musicFromServerPop);
        setInitialSongs(musicFromServerPop);
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
    setMusicPop(filteredSongs);
  }, [searchTerm, initialSongs]);
  
  function searchInputHandler(event){
    setSearchTerm(event.target.value.toLowerCase());
  }

  function handlePopCardClick(songUrl, audioRef, title, subtitle, avatar) {
    setCurrentSongUrl(songUrl);
    setCurrentAudioRef(audioRef);
    setCurrentTitle(title);
    setCurrentSubtitle(subtitle);
    setCurrentAvatar(avatar);
  }

  return (
    
    <section className='Pop_music_list_section'>

<p className='user'>Hello, {auth.user.email}</p>
      <input type='text' id='search' onChange={searchInputHandler} placeholder='Search' className='popSearch'></input>
      <ul className='Pop_music_list_container'>
        {musicDataPop.map((musicDataPop) => {
          return (
            <PopCardComponent
              key={musicDataPop.key}
              title={musicDataPop.title}
              subtitle={musicDataPop.subtitle}
              id={musicDataPop.id}
              songUrl={musicDataPop.uri}
              avatar={musicDataPop.avatar}
              onPopCardClick={handlePopCardClick}
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

function PopCardComponent(props) {
  const { title, subtitle, avatar, id, songUrl, onPopCardClick } = props;
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
    onPopCardClick(songUrl, audioRef, title, subtitle, avatar);
  }

  return (
    <li className='Pop_music_card_container' >
      <article className='Pop_music_card'>
        <img src={avatar} alt="Pop_Song Avatar" className='Pop_avatar' onClick={handleClick}/>
        <Link to={`/PopMusicDetails/${id}`}>
          <span className='Pop_music_card_title'>{title} - </span>
          <span className='Pop_music_card_subtitle'>{subtitle}</span>
        </Link>
        <button className='favorite_button' onClick={Favorite}>
          ❤️
        </button>
      </article>
    </li>
  );
}