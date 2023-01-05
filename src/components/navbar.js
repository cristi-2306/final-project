import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './navbar.css';
import {GiRocketThruster} from 'react-icons/gi';
import {FaBars, FaTimes} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import { AuthContext } from "../App"; 


function Navbar() {
   const [click, setClick]= useState(false)
   const handleClick = () => setClick(!click)
   const closeMobileMenu =() => setClick(false)
   const {auth, logOut} = useContext(AuthContext);
  return(
    <>
    
    <IconContext.Provider value={{color: "#000"}}>
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/Home" className="navbar-logo" onClick={closeMobileMenu} >
         <span>  GROOVY BIN </span> 
        </Link>
        <div className="menu-icon" onClick={handleClick}>
        {click ? <FaTimes/> : <FaBars/>}

        </div>
        <ul className={click? 'nav-menu active' : "nav-menu"}>
          <li className="nav-item">
            <NavLink to='/Home' className={({isActive}) =>"nav-links" +(isActive? " activated" :"")}
             onClick ={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to='/AroundYou' 
            className={({isActive}) =>
            "nav-links" + (isActive? " activated" :"")}
            
            onClick ={closeMobileMenu}>
              Around You
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/topCharts' className={({isActive}) =>"nav-links" + (isActive? " activated" :"")}
            onClick ={closeMobileMenu}
            >
              Top Charts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/Favorites' className={({isActive}) =>"nav-links" + (isActive? " activated" :"")}
             onClick ={closeMobileMenu}
            >
              Favorites
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/Profile' className={({isActive}) =>"nav-links" + (isActive? " activated" :"")}
             onClick ={closeMobileMenu}
            >
              User Profile
            </NavLink>
          </li>
          <li className="nav-item_logOut" onClick={logOut}>
           <button className="log_out_btn">LogOut</button>
          </li>
       
        </ul>
      </div>
    </nav>
    </IconContext.Provider>
    </>
  );
}

export default Navbar;

