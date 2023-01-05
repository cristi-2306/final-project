import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import App from '../../App';
import './topChartsHome.css'
import './topChartsHomeCard.css'
export function TopChartsHome() {
    const musicUrl = 'http://localhost:3001/songs';
    const [musicData, setMusic] = useState([]);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
   
        fetch(musicUrl, {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        })
    
          .then(response => response.json())
          .then((musicFromServer) => {
            setMusic(musicFromServer);
            
          })
          .catch(err => console.error(err));
    
      }, []);
    
    
      return (
        <section className='TopChartsHome_list_section'>
      
          <ul className='TopChartsHome_list_container'>
            <Link to='/TopCharts'>

          <span>See more</span>
          </Link>
            {musicData.map((musicData) => {
              return (
                <MusicCardComponent
                  key={musicData.key}
                  title={musicData.title}
                  subtitle={musicData.subtitle}
                  id={musicData.id}
                  songUrl= {musicData.uri}
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
    <li className='TopChartsHome_card_container'>
      <article className='TopChartsHome_card'>
        <img src={avatar} alt="Song Avatar" className='avatar_top_home'/>
        <div className='titles'>
            <div className='TopChartsHome_card_title'>{title} - </div>
         <div className='TopChartsHome_card_subtitle'>{subtitle}</div>
        </div>
      
      </article>
    </li>
  );
}
export default TopChartsHome;