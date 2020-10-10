import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/playListBrowser.css";

function Playlists() {
    const { userData, setUserData } = useContext(UserContext);
    const [userPlaylists, setUserPlaylists] = useState(null);
    const [selectedPlaylist, setSelectedPlaylsit] = useState(null);


    const getUserID = async () => {

        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }

        }
        )
            .then(res => {
                console.log(res.data.id);
                getPlaylists(res.data.id);
            })
    }

    const getPlaylists = async (id) => {
        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/users/'+id+'/playlists',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }

        }
        )
            .then(res => {
                console.log(res);
                setUserPlaylists(res.data.items);
            })
    }

    function getPlaylistData(id) {
        setSelectedPlaylsit(id);

        
        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/playlists/'+id+'/tracks',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }

        }
        )
            .then(res => {
                Axios({
                    method: 'get',
                    url: 'https://api.spotify.com/v1/audio-features?',
                    headers: {
                        'Authorization': 'Bearer ' + userData.token,
                    }

                }
                )
                    .then(res2 => {
                        console.log(res2);
                    })



            })

    }

    useEffect(() => {
        getUserID();
    }, []);


    return (
        <div id="PlaylistBrowser">
            <h1>Analyse your playlists!</h1>
            <p>Select one of your playlists to explore interesting features about them!</p>

            {
                selectedPlaylist ? 
                    <></> :
                    <div id="playlistContainer">
                        {userPlaylists ?
                            userPlaylists.map((item, i) =>
                                <div key={item.id} className="playListTile">
                                    <button onClick={() => getPlaylistData(item.id)}> 
                                    {item.images.length > 0 ? <img src={item.images[0].url} /> : <img src={require("../resources/NoProfile.png")} />}
                                        </button>
                                        <h3>{item.name}</h3>

                                </div>
                            )
                            : <></>
                        }
                    </div>

            }


          
        </div>

       
    );
}

export default Playlists;
