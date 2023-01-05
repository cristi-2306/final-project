import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../../App';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css'
function UserProfile () {
    const { auth } = useContext(AuthContext);
    return(
        <div className="user_profile">
           <p className='user'>Hello, {auth.user.email}</p>
           <p className='user'>First name: {auth.user.firstName}</p>
           <p className='user'>Last name:{auth.user.lastName}</p>
           <p className='user'>{auth.user.password}</p>
        </div>
    );
}

export default UserProfile;