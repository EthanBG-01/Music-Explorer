import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/options.css";
import Fade from 'react-reveal/Fade';


function Options(props) {
    const { userData, setUserData } = useContext(UserContext);
    
    const [topArtists, setTopArtists] = useState([]);
    const [popularArtists, setPopularArtists] = useState([]);

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

    const getPopularArtists = async () => {
        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/playlists/1QM1qz09ZzsAPiXphF1l4S',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }
        }
        ).then(res => {
            var top = [];
            top.push(res.data.tracks.items[0].track.artists[0].id);
            top.push(res.data.tracks.items[1].track.artists[0].id);
            top.push(res.data.tracks.items[2].track.artists[0].id);
            top.push(res.data.tracks.items[3].track.artists[0].id);

            var popular = [];
            for (var i = 0; i < 4; i++) {
                Axios({
                    method: 'get',
                    url: `https://api.spotify.com/v1/artists/` + top[i],
                    headers: {
                        'Authorization': 'Bearer ' + userData.token,
                    }
                }
                ).then(res2 => {
                    popular.push(res2.data.images[0].url);
                })
            }
            console.log("here");
            setPopularArtists(popular);
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
        getPopularArtists();
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
                                    <img className="icon" src={item} key={item} />
                            )
                            : <p> loading </p>
                            }
                    </div>
                        <button onClick={setView} className="spotify-theme-button">VIEW YOUR ARTISTS</button>
                </div>
                    <div id="search">
                    
                    <div id="artistGallery">
                            {popularArtists ?
                                popularArtists.map((item, i) =>
                                    <img className="icon" src={item} key={item}/>
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
 