import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/options.css";

function Options() {
    const { userData, setUserData } = useContext(UserContext);

    const [option, setOption] = useState({
        page: null,
    })

    const [topArtists, setTopArtists] = useState([]);

    const getTopArtists = async () => {

        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/top/artists',
            data: {
                'limit': 4,
                'time_range': 'long_term',
            },
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }
        }
        )
            .then(res => {
                var artists = [];
                for (var i = 0; i < 4; i++) {
                    artists.push(res.data.items[i].images[0].url);
                }

                setTopArtists(artists);
            })

    }



    useEffect(() => {
        getTopArtists();
    }, [])


    return (
        <div id="Options">

            <div className="title">

                <h2>Welcome To</h2>
                <h1>Music Explorer</h1>
                <p>Welcome, Select an option below to get started!</p>
            </div>

            <div id="optionHolder">
                <div id="view">
                    <div id="artistGallery">
                        
                    </div>
                    <button className="spotify-theme-button">VIEW YOUR ARTISTS</button>
                </div>
                <div id="search">
                    <div id="artistGallery">

                    </div>
                    <button className="spotify-theme-button">SEARCH ARTISTS</button>
                </div>
            </div>

        </div>
    );
}

export default Options;
