import React, { useContext } from 'react';
import "./css/landingPage.css";
import UserContext from "../context/UserContext";

function Landing() {
    const { setUserData } = useContext(UserContext);

   

    const Authorize = () => {
        const client_id = ""; //Your clientID
        const redirect_uri = "http://localhost:3000";
        const scope = "user-read-private user-read-email user-top-read";

        const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        window.location = url;

        
    }

    return (
        <div id="Landing">
            <div id="content">

                <div id="title">
                    <img src={require("../resources/Spotify_Logo_RGB_Green.png")} />
                    <h4>  API Project</h4>
                </div>

                <h1>Music Explorer</h1>
                <p>Data visualisation using Spotify's API with oauth2 user authentification.</p>
                

                <div id="carousel">
                    <img id="imageOne"
                        className="artistImage" src={require("../resources/Fender.jpg")} />
                    <img id="imageTwo" className="artistImage" src={require("../resources/M83.jpg")} />
                    <img id="imageThree" className="artistImage" src={require("../resources/Billie.jpg")} />
                </div>

                <h3>Explore your music taste and discover new artsts based on your current favourites!</h3>

                <div id="loginPanel">
                    <p>Please log in to continue</p>
                    <button onClick={Authorize}>LOG IN</button>

                </div>
            </div>
        </div>
    );
}

export default Landing;
