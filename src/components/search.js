import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/options.css";
import Fade from 'react-reveal/Fade';


function Search() {
    const { userData, setUserData } = useContext(UserContext);


    return (

        <div id="Search">
            
        </div>
    );
}

export default Search;
