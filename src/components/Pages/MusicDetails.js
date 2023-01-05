import React, { useContext, useEffect, useState } from "react";
import './Home.css';
import'./MusicDetails.css'
import EditComponent from "./EditComponent";
import { useParams, useNavigate } from "react-router-dom";
import CreateComponent from './CreateComponent';
import { AuthContext } from "../../App";
import { ConfirmationModal } from "./ConfirmationModal";

function MusicDetails () {
    const musicDetailsUrl = 'http://localhost:3001/songs';
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
     .then(() => navigate('../../'));
  }

  function handleCancelDelete() {
    setIsConfirmationModalOpen(false);
  }

    return(
      <li className='details'>
      <article className='music_card_details'>
        <img src={songDetails.avatar} alt="Song Avatar" className='avatar_details'/>
        <span className='title_details'>{songDetails.title} - </span>
         <span className='subtitle_details'>{songDetails.subtitle}</span>
         <span className="song_url">{songDetails.songUrl}</span>
        

          {
        auth.user.admin &&  <button onClick={deleteSong} className='delete_btn'>Delete</button>
      }

       
         <button onClick={() => setIsOpen(true)} className='edit_btn'>Edit</button>
         <button onClick={() => setIsOpen2(true)} className='create_btn'>Create</button>
        
      
      </article>
     <EditComponent open={isOpen} onClose={() => setIsOpen(false)}>

    </EditComponent>

     <CreateComponent open2={isOpen2} onClose2={() => setIsOpen2(false)}>
     modal 2
      </CreateComponent>

      
      {isConfirmationModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </li>
    );
}

export default MusicDetails

