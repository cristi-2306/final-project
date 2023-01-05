import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { ConfirmationModal } from "../ConfirmationModal";
import '@fortawesome/fontawesome-free/js/all.js';
import CreateComponentHouse from "./CreateComponentHouse";
import'./MusicDetailsPop.css'
import EditComponentHouse from "./EditComponentHouse";
function HouseMusicDetails () {
    const musicDetailsUrl = 'http://localhost:3001/house';
    let {id} = useParams();
    const [songDetailsHouse, setSongDetailsHouse] = useState({});
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
    .then((songs) => setSongDetailsHouse(songs))
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
      <img src={songDetailsHouse.avatar} alt="Song Avatar" className='pop_avatar_details'/>
      <span className='pop_title_details'>{songDetailsHouse.title} - </span>
       <span className='pop_subtitle_details'>{songDetailsHouse.subtitle}</span>
       <span className="pop_song_url">{songDetailsHouse.songUrl}</span>
      
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
   <EditComponentHouse open={isOpen} onClose={() => setIsOpen(false)}>

  </EditComponentHouse>

   <CreateComponentHouse open2={isOpen2} onClose2={() => setIsOpen2(false)}>
     modal 2
    </CreateComponentHouse>

    
    {isConfirmationModalOpen && (
      <ConfirmationModal
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    )}
  </li>
  );
}

export default HouseMusicDetails;
