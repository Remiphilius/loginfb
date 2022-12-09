import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [blaz, setBlaz] = useState("");

  const onLoginClick = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        console.log(response);
        window.FB.api('/me', function (response) {
          console.log('Good to see you, ' + response.name + '.');
          setBlaz(response.name);
          console.log(response);
        });
        setIsLoggedin(true);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
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
      js.src = "https://connect.facebook.net/fr_FR/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div>
      {isLoggedin
        ? <p>{`Bonjour ${blaz} !`}</p>
        : <button onClick={onLoginClick}>Login with Facebook</button>}
    </div>
  );
};

export default App;
