import React, { useState } from "react";
import ReactDom from 'react-dom';
import './CreateComponent.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

 function CreateComponent({open2, children2, onClose2}){
    const createSongCardUrl = 'http://localhost:3001/songs';
    let {id} = useParams();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [avatar, setAvatar] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songKey, setSongKey] = useState('');
    const navigate = useNavigate();  


    function titleChange(event) {
        setTitle(event.target.value)
      } 

      function subtitleChange(event) {
        setSubtitle(event.target.value)
      } 
      
      function avatarChange(event) {
        setAvatar(event.target.value)
      } 

      function songUriChange(event) {
        setSongUrl(event.target.value)
      } 

      function keyChange(event) {
        setSongKey(event.target.value)
      } 


    function submit(event) {
        event.preventDefault();

        const body = {
            title: title,
            subtitle: subtitle,
            avatar: avatar,
            uri: songUrl,
            key: songKey,
        };

        fetch(createSongCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }).then(()=> navigate('../'));
      }


    if (!open2) return null
return ReactDom.createPortal (
     <>
       <form className="create_component">
          <div className="container">
        <div className="create_key">
           <label htmlFor='songKey' ></label>
           <input id="songKey" type='number' value={songKey} onChange={keyChange} ></input>
        </div> 

            <div className="create_title">
           <label htmlFor='title'>Title</label>
           <input id="title" type='text' value={title} onChange={titleChange} ></input>
           </div>

           <div className="create_subtitle">
           <label htmlFor='subtitle' ></label>
           <input id="subtitle" type='text' value={subtitle}onChange={subtitleChange} ></input>
           </div>

           <div className="create_image">
           <label htmlFor='image'  ></label>
           <input id="image" type='text' value={avatar} onChange={avatarChange} ></input>
           </div>

           <div className="create_songUrl">
           <label htmlFor='songUrl' ></label>
           <input id="songUrl" type='text' value={songUrl} onChange={songUriChange} placeholder="Song Url"></input>
           </div> 
          
         <div className="buttons">
         <button className="save_changes" onClick={submit}>Create</button>
         <button onClick= {onClose2}>Close</button>
         </div>
         {children2}
         </div>
        </form>
       </>,

   document.getElementById('portal2')

)

} 

export default CreateComponent;