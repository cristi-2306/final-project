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
        <div>
           <label htmlFor='songKey' >Key</label>
           <input id="songKey" type='number' value={songKey} onChange={keyChange}></input>
           </div> 

            <div>
           <label htmlFor='title'>Title</label>
           <input id="title" type='text' value={title} onChange={titleChange}></input>
           </div>
           <div>
           <label htmlFor='subtitle' >Subtitle</label>
           <input id="subtitle" type='text' value={subtitle}onChange={subtitleChange}></input>
           </div>
           <div>
           <label htmlFor='image'  > Avatar</label>
           <input id="image" type='text' value={avatar} onChange={avatarChange}></input>
           </div>
           <div>
           <label htmlFor='songUrl' >Song Url</label>
           <input id="songUrl" type='text' value={songUrl} onChange={songUriChange}></input>
           </div> 
          

         <button className="save_changes" onClick={submit}>Create</button>
         
    
         {children2}
         <button onClick= {onClose2}> Close Modal</button>
        </form>
       </>,

   document.getElementById('portal2')

)

} 

export default CreateComponent;