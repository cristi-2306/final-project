import React, { useContext, useEffect, useState } from "react";
import EditComponent from "../EditComponent";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { ConfirmationModal } from "../ConfirmationModal";
import CreateComponentPop from "./CreateComponentPop";
import '@fortawesome/fontawesome-free/js/all.js';
import './MusicDetailsPop.css'
import EditComponentPop from "./EditComponentPop";
function PopMusicDetails () {
    const musicDetailsUrl = 'http://localhost:3001/pop';
    let {id} = useParams();
    const [songDetails, setSongDetails] = useState({});
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect (() => {
    fetch (`${musicDetailsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    .then((response) => response.json())
    .then((songs) => setSongDetails(songs))
  }, []);
   

  function deleteSong () {
    setIsConfirmationModalOpen(true);
  }
 
  function handleConfirmDelete() {
    fetch (`${musicDetailsUrl}/${id}`,{
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
      <img src={songDetails.avatar} alt="Song Avatar" className='pop_avatar_details'/>
      <span className='pop_title_details'>{songDetails.title} - </span>
       <span className='pop_subtitle_details'>{songDetails.subtitle}</span>
       <span className="pop_song_url">{songDetails.songUrl}</span>
      
<div className="buttons_pop">
      {
  auth.user.admin && <> <button onClick={deleteSong} className='pop_delete_btn'>
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
   <EditComponentPop open={isOpen} onClose={() => setIsOpen(false)}>

  </EditComponentPop>

   <CreateComponentPop open2={isOpen2} onClose2={() => setIsOpen2(false)}>
     modal 2
    </CreateComponentPop>

    
    {isConfirmationModalOpen && (
      <ConfirmationModal
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    )}
  </li>
  );
}

export default PopMusicDetails;
