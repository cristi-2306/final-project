import React, { useState } from "react";
import './EditComponent.css';

import ReactDom from 'react-dom';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function EditComponent ({open, children, onClose}) {
    const musicDetailsUrl = 'http://localhost:3001/songs';
    let {id} = useParams();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [avatar, setAvatar] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songKey, setSongKey] = useState('');
    const navigate = useNavigate();

    useEffect (() => {
        fetch (`${musicDetailsUrl}/${id}`)
        .then((response) => response.json())
        .then((songs) => {
            setTitle(songs.title);
            setSubtitle(songs.subtitle);
            setAvatar(songs.avatar);
            setSongUrl(songs.uri);
            setSongKey(songs.key);
        })
      }, []);

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

        fetch(`${musicDetailsUrl}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }).then(()=> navigate('../'));
      }


      if(!open) return null

    return ReactDom.createPortal (
        <>
        <form className="edit_component">
        <div>
           <label htmlFor='songKey' ></label>
           <input id="songKey" type='number' value={songKey} onChange={keyChange}></input>
           </div> 

            <div>
           <label htmlFor='title'></label>
           <input id="title" type='text' value={title} onChange={titleChange}></input>
           </div>
           <div>
           <label htmlFor='subtitle' ></label>
           <input id="subtitle" type='text' value={subtitle}onChange={subtitleChange}></input>
           </div>
           <div>
           <label htmlFor='image'  ></label>
           <input id="image" type='text' value={avatar} onChange={avatarChange}></input>
           </div>
           <div>
           <label htmlFor='songUrl' ></label>
           <input id="songUrl" type='text' value={songUrl} onChange={songUriChange}></input>
           </div> 
          

         <button className="save_changes" onClick={submit}>Save changes</button>
         <button className="close-btn" onClick={onClose} > Close</button>
    
           {children}  
        </form>
       </>,
       document.getElementById('portal')
    ) 
}

export default EditComponent;