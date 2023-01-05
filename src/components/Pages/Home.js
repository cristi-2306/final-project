import React from "react";
import './Home.css';
import { Pop } from "./Generes/Pop";
import { Rock } from "./Generes/Rock";
import { House } from "./Generes/House";
import { useState } from "react";
import { FaFontAwesome } from "react-icons/fa";
import TopChartsHome from "./TopChartsHome";
import HorizontalScroller from "./TopArtistshome";
import Navbar from "../navbar";
function Home () {
  
    
    const [selectedOption, setSelectedOption] = useState(null);
  
   
    const handleChange = (event) => {
     
      setSelectedOption(event.target.value);
    }
  
    let component;
    
    if (selectedOption === 'pop') {
      component = <Pop />;
    } else if (selectedOption === 'rock') {
      component = <Rock  />;
    } else if (selectedOption === 'house') {
      component = <House />;
    } else {
  
      component = <Pop />;
    }
  
    return(
      <>
      <Navbar/>
      <TopChartsHome/>
 
      <div className="select_container">
        <select id="type" onChange={handleChange} className='select'>  
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value ="house">House</option>
      </select>  
      </div>
      {component}
    </>
  );
}

export default Home;