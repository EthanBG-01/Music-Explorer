import React, { useState, useEffect } from 'react';
import "./css/landingPage.css";

function Landing() {

    const artistArray = ["../resources/Fender.jpg", "../resources/Bastille.jpg", "../resources/M83.jpg", "../resources/Billie.jpg", "../resources/WalkTheMoon.jpg"];
    const names = ["imageOne", "imageTwo", "imageThree"];
    var arrayPointer = 0;

    const { galleryImages, setGalleryImages } = useState(["../resources/Fender.jpg", "../resources/Bastille.jpg", "../resources/M83.jpg"]);
    
    /*
    function yourFunction() {
        alert("hit");
        setTimeout(yourFunction, 5000);
    }


    useEffect(() => {
        yourFunction();
    }, [])

*/
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
                    <button>LOG IN</button>

                </div>
            </div>
        </div>
    );
}

export default Landing;
