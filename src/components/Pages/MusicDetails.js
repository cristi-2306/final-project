import React, { useContext, useEffect, useState } from "react";
import './Home.css';
import'./MusicDetails.css'
import EditComponent from "./EditComponent";
import { useParams, useNavigate } from "react-router-dom";
import CreateComponent from './CreateComponent';
import { AuthContext } from "../../App";


function MusicDetails () {
    const musicDetailsUrl = 'http://localhost:3001/songs';
    let {id} = useParams();
    const [songDetails, setSongDetails] = useState({});

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    



  useEffect (() => {
    fetch (`${musicDetailsUrl}/${id}`)
    .then((response) => response.json())
    .then((songs) => setSongDetails(songs))
  }, []);
   

  function deleteSong () {
  fetch (`${musicDetailsUrl}/${id}`,{
    method: 'DELETE',
  } )
   .then(() => navigate('../../'));
  }

    return(
      <li className='details'>
      <article className='music_card_details'>
        <img src={songDetails.avatar} alt="Song Avatar" className='avatar_details'/>
        <span className='title_details'>{songDetails.title} - </span>
         <span className='subtitle_detasils'>{songDetails.subtitle}</span>
         <button onClick={deleteSong}>Delete</button>
         <button onClick={() => setIsOpen(true)}>Edit</button>
         <button onClick={() => setIsOpen2(true)}>Create</button>
      </article>
     <EditComponent open={isOpen} onClose={() => setIsOpen(false)}>

    </EditComponent>

     <CreateComponent open2={isOpen2} onClose2={() => setIsOpen2(false)}>
     modal 2
      </CreateComponent>  
    </li>
    );
}

export default MusicDetails