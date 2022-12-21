import { useContext, useEffect, useState } from 'react';
import './musicListComponent.css';
import './musicCardComponent.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
export function MusicListComponent() {

  const musicUrl = 'http://localhost:3001/songs';
  const [musicData, setMusic] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialSongs, setInitialSongs] = useState([]);
 const {auth} = useContext(AuthContext);
  

  useEffect(() => {
   
    fetch(musicUrl, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })

      .then(response => response.json())
      .then((musicFromServer) => {
        setMusic(musicFromServer);
        setInitialSongs(musicFromServer);
      })
      .catch(err => console.error(err));

  }, []);


  

  useEffect (() => {
const filteredSongs = initialSongs.filter((songs) => 
                      songs.title.toLowerCase().includes(searchTerm) || songs.subtitle.toLowerCase().includes(searchTerm))
                                  
      setMusic(filteredSongs);
  }, [searchTerm]);

  function searchInputHandler(event){
      setSearchTerm(event.target.value.toLowerCase());
      
  }


  return (
    <section className='music_list_section'>
      <header className='music_list_header'> Music List</header>


      <label htmlFor='search'>Search</label>
      <input type='text' id='search' onChange={searchInputHandler}></input>

      <ul className='music_list_container'>
        {musicData.map((musicData) => {
          return (
            <MusicCardComponent
              key={musicData.key}
              title={musicData.title}
              subtitle={musicData.subtitle}
              id={musicData.id}
              avatar={musicData.avatar}>
              </MusicCardComponent>
          );
        })}


      </ul>

    </section>

  );
}

function MusicCardComponent(props) {
  const { title, subtitle, avatar, id} = props;
  return (
    <Link to={`/MusicDetails/${id}`}>
    <li className='music_card_container'>
      <article className='music_card'>
        <img src={avatar} alt="Song Avatar" className='avatar'/>
        <span className='music_card_title'>{title} - </span>
         <span className='music_card_subtitle'>{subtitle}</span>
      </article>


    </li>
    </Link>
  );

}