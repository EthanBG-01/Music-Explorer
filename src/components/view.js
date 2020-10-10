import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/search.css";

function View() {
    const { userData, setUserData } = useContext(UserContext);

    function getTopArtists() {
        
        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/playlists/' + id + '/tracks',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }

        }
        )
            .then(res => {
                console.log(res);
            })

    }

    useEffect(() => {
        getTopArtists();
    }, []);

    return (
        <div id="View">
           

        </div>


    );
}

export default View;
