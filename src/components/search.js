import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./css/search.css";

import Graph from 'vis-react';


function Search() {
    const { userData, setUserData } = useContext(UserContext);

    const [ search, setSearch ] = useState();
    const [searchRes, setSearchRes] = useState(null);
    const [seedArtists, setSeedArtists] = useState([]);

    const graph = {
        nodes: [
            { id: 1, label: "Node 1", color: "#e04141" },
            { id: 2, label: "Node 2", color: "#e09c41" },
            { id: 3, label: "Node 3", color: "#e0df41" },
            { id: 4, label: "Node 4", color: "#7be041" },
            { id: 5, label: "Node 5", color: "#41e0c9" }
        ],
        edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
    };

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        }
    };


    const searchFunction = async (e) => {
        e.preventDefault();

        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/search?q=' + search + '&type=artist',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }

        }
        )
            .then(res => {
                setSearchRes(res.data.artists.items);
            })
    }

    const getRelated = async (artistID) => {

        if (seedArtists.filter(artist => artist.id == artistID).length > 0) return;

        Axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/artists/'+artistID+'/related-artists',
            headers: {
                'Authorization': 'Bearer ' + userData.token,
            }
        })
            .then(res => {

                 
                    var seed = searchRes.filter(artist => artist.id == artistID);
                    setSeedArtists(seedArtists.concat(seed[0]));        
                
                console.log(res);
            })
    }

    const removeSeed = (seed) => {
        var tasks = seedArtists.filter(artist => artist.id !== seed);
        setSeedArtists(tasks);
    }

    return (
        <div id="Search">
            <div id="searchBar">
                <div id="introBar">
                    <img src={require("../resources/Spotify_Logo_RGB_Green.png")}/>
                    <span > API Project</span>

                    <h1>Music Explorer</h1>
                    <p>Visualisation Site using Spotify's API</p>
                    <h4>Explore Spotify's Artist records, and discover new music based on your searches!</h4>
                </div>


                <div id="searchFunctions">
                    <p>Search Artist: </p>
                    <input onChange={e=>setSearch(e.target.value)}></input>
                    <button onClick={searchFunction} id="spotify-theme-button">SEARCH</button>
                </div>

                <div id="searchList">
                    {searchRes ?
                        searchRes.map((item, i) =>
                            <div key={item.id} className="searchProfile">

                                {item.images.length > 0 ? <img src={item.images[0].url} /> : <img src={require("../resources/NoProfile.png")} />   }
                                <div className="searchText">
                                    <h3>{item.name}</h3>
                                    <p>{item.followers.total} Followers</p>
                                </div>

                                <button onClick={() => getRelated(item.id)} >ADD</button>
                            </div>
                        )
                        : <></>
                    }

                </div>
            </div>

            <div id="contentPane">
                <div id="seeds">
                    {seedArtists.length>0 ?
                        seedArtists.map((item, i) =>
                            <div key={item.id} className="seed">

                                {item.images.length > 0 ? <img src={item.images[0].url} /> : <img src={require("../resources/NoProfile.png")} />}
                                
                                <button onClick={() => removeSeed(item.id)}>x</button>
                            </div>
                        )
                        : <></>
                    }
                </div>

                <Graph graph={graph} options={options} style={{width:"75vw", height:"100vh"}}/>
            </div>

           
        </div>

       
    );
}

export default Search;
