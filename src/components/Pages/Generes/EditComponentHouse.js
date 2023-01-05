import React, { useContext, useState } from "react";
import '../EditComponent.css';

import ReactDom from 'react-dom';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";

function EditComponentHouse ({open, children, onClose}) {
    const musicDetailsUrl = 'http://localhost:3001/house';
    let {id} = useParams();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [avatar, setAvatar] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songKey, setSongKey] = useState('');
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);

    useEffect (() => {
        fetch (`${musicDetailsUrl}/${id}`,{
          headers: {
            Authorization : `Bearer ${auth.accessToken}`
          }
        })
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
                'Content-Type' : 'application/json',
                 Authorization: `Bearer ${auth.accessToken}`
            },
            body: JSON.stringify(body)
        }).then(()=> navigate('/Home'));
      }


      if(!open) return null

    return ReactDom.createPortal (
        <>
         <form className="edit_component">
          <div className="container">
        <div className="edit_key">
           <label htmlFor='songKey' ><span>Song key</span></label>
           <input id="songKey" type='number' value={songKey} onChange={keyChange} ></input>
           </div> 

            <div className="edit_title"> 
           <label htmlFor='title'><span>Title</span></label>
           <input id="title" type='text' value={title} onChange={titleChange} placeholder></input>
           </div>

           <div className="edit_subtitle">
           <label htmlFor='subtitle' ><span>Subtitle</span></label>
           <input id="subtitle" type='text' value={subtitle}onChange={subtitleChange}></input>
           </div>

           <div className="edit_image">
           <label htmlFor='image'  ><span>Avatar</span></label>
           <input id="image" type='text' value={avatar} onChange={avatarChange}></input>
           </div>

           <div className="edit_songUrl">
           <label htmlFor='songUrl' ><span>Song Url</span></label>
           <input id="songUrl" type='text' value={songUrl} onChange={songUriChange}></input>
           </div> 
          

         <button className="save_changes" onClick={submit}>Save</button>
         <button className="close-btn" onClick={onClose} > Close</button>
    </div>
           {children}  
        </form>
       </>,
       document.getElementById('portal')
    ) 
}

export default EditComponentHouse;