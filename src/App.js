import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import MusicDetails from './components/Pages/MusicDetails';
import Login from './components/Pages/Auth/Login';
import AroundYou from './components/Pages/AroundYou';
import Navbar from './components/navbar';
import { AuthContextProvider } from './components/Pages/Auth/auth-context';
import Register from './components/Pages/Auth/Register';
import PopMusicDetails from './components/Pages/Generes/PopMusicDetails';
import TopChartsHome from './components/Pages/TopChartsHome';
import HouseMusicDetails from './components/Pages/Generes/HouseMusicDetails';
import RockMusicDetails from './components/Pages/Generes/RockMusicDetails';
import TopCharts from './components/Pages/TopCharts';
import Favourites from './components/Pages/Generes/Fav';
import UserProfile from './components/Pages/Auth/Profile';
  export const AuthContext = React.createContext();
  
const App = () => {
     
  
 return(
  <BrowserRouter>
<AuthContextProvider>

        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/Home' element= {<><Home/><Navbar/></> }></Route>
          <Route path='/TopChartsHome' element= {<TopChartsHome/> }></Route>
          <Route path='/MusicDetails/:id' element={<MusicDetails/>}></Route>
          <Route path='/PopMusicDetails/:id' element={<><PopMusicDetails/><Navbar/></>}></Route>
          <Route path='/HouseMusicDetails/:id' element={<><HouseMusicDetails/><Navbar/></>}></Route>
          <Route path='/AroundYou' element= {<><Navbar/><AroundYou/></>}></Route>
          <Route path='/TopCharts' element={<><TopCharts/><Navbar/></>}></Route>
          <Route path='/Favorites' element={<><Favourites/><Navbar/></>}></Route>
          <Route path='/Profile' element={<><UserProfile/><Navbar/></>}></Route>
          <Route path='/RockMusicDetails/:id' element= {<><RockMusicDetails/><Navbar/></>}></Route>
        </Routes>
   </AuthContextProvider>     
        </BrowserRouter>

        
);
}
 export default App;
 

