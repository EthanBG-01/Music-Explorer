import React, { useState, useEffect } from 'react';
import "./css/options.css";

function Options() {

    const [option, setOption] = useState({
        page: null,
    })


    return (
        <div id="Options">
        
            <button className="spotify-theme-button">VIEW YOUR ARTISTS</button>
            <button className="spotify-theme-button">SEARCH ARTISTS</button>
        </div>
    );
}

export default Options;
