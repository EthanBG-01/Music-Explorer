import React, { useState, useEffect } from 'react';
import UserContext from "./context/UserContext";
import './App.css';
import Landing from './components/landingPage';
import Options from './components/options';


function App() {

    const [userData, setUserData] = useState({
        token: undefined
    });

    //Get the hashes in the URL:
    const hash = window.location.hash.substring(1).split("&").reduce(function (initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial;
    }, {}); 

    window.location.hash = "";
    
    useEffect(() => {
        let token = hash.access_token;
        if (token) {
            setUserData({
                token
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }} >
            <div className="App">

                {
                    userData.token ?
                        <Options />
                        : 
                        <Landing />
                } 

            </div>
        </UserContext.Provider>
  );
}

export default App;
