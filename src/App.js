import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [blaz, setBlaz] = useState("");

  const checkAdmin = (resp) => {
    console.log("checkAdmin");
    const getNeo = (page) => {
      return(page.id === "110186227549578");
    };
    const pages = resp.data.data;
    const neos = pages.filter(getNeo);
    console.log(neos);
    console.log(neos.some(el => el.tasks.includes("MODERATE")));
    return (neos.some(el => el.tasks.includes("MODERATE")));
  };

  const onLoginClick = async () => {
    console.log("On a clické sur le bail");
    window.FB.login(async function (response) {
      const userID = response.authResponse.userID;
      const token = response.authResponse.accessToken;
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        console.log(response);
        window.FB.api('/me', function (response) {
          console.log('Good to see you, ' + response.name + '.');
          setBlaz(response.name);
          console.log(response);
        });
        setIsLoggedin(true);
        const accounts =  await axios.get(`https://graph.facebook.com/${userID}/accounts`, {params: {access_token: token}});
        console.log(accounts);
        setIsAdmin(checkAdmin(accounts));
        console.log(isAdmin);
        if (isAdmin){
          console.log("BRAVO TU ES ADMIN");
        }
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      scope: 'email,public_profile',
      return_scopes: true
    })
  };

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '419740503360817',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v15.0'
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/ar_AR/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div>
      <p>أود أن أصبح ملك العالم في سن الثلاثين</p>
      {/* <p>me gusta Shakira</p> */}
      {isLoggedin
        ? <p>{`Bonjour ${blaz} !`}</p>
        : <div>
          {/* <div onClick={onLoginClick}> */}
        {/* <div className="fb-login-button" data-width="300" data-size="large" data-button-type="login_with" onClick={() => console.log('pute')}></div> */}
        {/* <p>Alors</p> */}
        <button onClick={onLoginClick}>J'adore les huîtres au jambon</button>
        {/* </div> */}
        </div>
      }
    </div>
  );
};

export default App;
