import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/options.css";
import Fade from 'react-reveal/Fade';


function Options(props) {
    const { userData, setUserData } = useContext(UserContext);
    
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
    
    const setSearch = () => {
        props.setOption("search");
    }

    const setView = () => {
        props.setOption("view");
    }

    useEffect(() => {
        getTopArtists();
    }, [])


    return (
        
        <div id="Options">
            <Fade duration={3000} down>

            
                <div className="title">

                    <h2>Welcome To</h2>
                    <h1>Music Explorer</h1>
                    <p>Welcome, Select an option below to get started!</p>
                </div>
            
            <div id="optionHolder">
                    <div id="view">
                        
                    <div id="artistGallery">
                        {topArtists ?
                            topArtists.map((item, i) =>
                                <img className="icon" src={item} />
                            )
                            : <p> loading </p>
                            }
                    </div>
                        <button onClick={setView} className="spotify-theme-button">VIEW YOUR ARTISTS</button>
                </div>
                <div id="search">
                    <div id="artistGallery">
                        {topArtists ?
                            topArtists.map((item, i) =>
                                <img className="icon" src={item} />
                            )
                            : <p> loading </p>
                            }
                          
                    </div>
                        <button onClick={setSearch} className="spotify-theme-button">SEARCH ARTISTS</button>
                </div>
            </div>
                </Fade>

        </div>
    );
}

export default Options;
