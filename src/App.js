import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import TopCharts from './components/Pages/TopCharts';
import TopArtists from './components/Pages/TopArtists';
import MusicDetails from './components/Pages/MusicDetails';
import Login from './components/Pages/Auth/Login';
import AroundYou from './components/Pages/AroundYou';
import Navbar from './components/navbar';


  export const AuthContext = React.createContext();
  
const App = () => {
     
   const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')) || {});

   useEffect (() => {

    window.localStorage.setItem('auth', JSON.stringify(auth));

   }, [auth]);

<AuthContext.Provider value={{auth, setAuth}}>
<Navbar/>
    <BrowserRouter>
    
        <Routes>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/' element= {<Home/>}></Route>
          <Route path='/MusicDetails/:id' element={<MusicDetails/>}></Route>
          <Route path='/AroundYou' element= {<AroundYou/>}></Route>
          <Route path='/TopCharts' element={<TopCharts/>}></Route>
          <Route path='/TopArtists' element={<TopArtists/>}></Route>
          <Route path='/MusicDetails' element= {<MusicDetails/>}></Route>
        </Routes>
    </BrowserRouter>
</AuthContext.Provider>
}
 export default App;
 

