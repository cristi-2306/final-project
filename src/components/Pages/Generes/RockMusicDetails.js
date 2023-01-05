import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { ConfirmationModal } from "../ConfirmationModal";
import CreateComponentRock from "./CreateComponentRock";
import '@fortawesome/fontawesome-free/js/all.js';
import EditComponentRock from "./EditComponentRock";
import './MusicDetailsPop.css'
function RockMusicDetails () {
    const RockmusicDetailsUrl = 'http://localhost:3001/rock';
    let {id} = useParams();
    const [songDetailsRock, setSongDetailsRock] = useState({});
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect (() => {
    fetch (`${RockmusicDetailsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    .then((response) => response.json())
    .then((songs) => setSongDetailsRock(songs))
  }, []);
   

  function deleteSong () {
    setIsConfirmationModalOpen(true);
  }
 
  function handleConfirmDelete() {
    fetch (`${RockmusicDetailsUrl}/${id}`,{
      method: 'DELETE',
      headers: {
        Authorization : `Bearer ${auth.accessToken}`
      }
    } )
     .then(() => navigate('/Home'));
  }

  function handleCancelDelete() {
    setIsConfirmationModalOpen(false);
  }

  return(
    <li className='pop_details'>
    <article className='pop_music_card_details'>
      <img src={songDetailsRock.avatar} alt="Song Avatar" className='pop_avatar_details'/>
      <span className='pop_title_details'>{songDetailsRock.title} - </span>
       <span className='pop_subtitle_details'>{songDetailsRock.subtitle}</span>
       <span className="pop_song_url">{songDetailsRock.songUrl}</span>
      
<div className="buttons_pop">
      {
  auth.user.admin &&  <><button onClick={deleteSong} className='pop_delete_btn'>
    <i className='fa fa-trash' aria-hidden='true'></i>
  </button>
  <button onClick={() => setIsOpen(true)} className='pop_edit_btn'>
  <i className='fa fa-pen' aria-hidden='true'></i>
</button>

<button onClick={() => setIsOpen2(true)} className='pop_create_btn'>
  <i className='fa fa-plus' aria-hidden='true'></i>
</button></>
}



</div>
 
    </article>
   <EditComponentRock open={isOpen} onClose={() => setIsOpen(false)}>

  </EditComponentRock>

   <CreateComponentRock open2={isOpen2} onClose2={() => setIsOpen2(false)}>
     modal 2
    </CreateComponentRock>

    
    {isConfirmationModalOpen && (
      <ConfirmationModal
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    )}
  </li>
  );
}

export default RockMusicDetails;
