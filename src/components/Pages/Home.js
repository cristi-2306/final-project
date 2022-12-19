import React from "react";
import './Home.css';
import { MusicListComponent } from "../MusicListComponent";
function Home () {
    return(
        <div className="home">
          <MusicListComponent/>
        </div>
    );
}

export default Home