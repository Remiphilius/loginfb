import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [blaz, setBlaz] = useState("");
  const [tokenFB, setTokenFB] = useState("");

  const checkAdminToken = (pages) => {
    const getNeo = (page) => {
      return (page.id === "112109288411495");
    };
    const neos = pages.filter(getNeo);
    const userAdmin = neos.some(el => el.tasks.includes("MODERATE"));
    setIsAdmin(userAdmin);
    if (userAdmin) {
      const neo = neos.filter(el => el.tasks.includes("MODERATE"))[0];
      const token = neo.access_token;
      setTokenFB(token);
    }
  };

  const getPages = async (response) => {
    const userID = response.authResponse.userID;
    const token = response.authResponse.accessToken;
    window.FB.api('/me', function (response) {
      setBlaz(response.name);
    });
    setIsLoggedin(true);
    var resp = await axios.get(`https://graph.facebook.com/${userID}/accounts?access_token=${token}`)  // , { params: { access_token: token, limit: 1 } });
    console.log("Page 1");
    console.log(resp);
    const pages = resp.data.data;
    console.log(resp);
    while (resp.data.paging.next) {
      resp = await axios.get(resp.data.paging.next);
      pages.push(...resp.data.data);
    }
    return (pages);
  };

  const onLoginClick = async () => {
    window.FB.login(async function (response) {
      if (response.authResponse) {
        const pages = await getPages(response);
        console.log("Pages");
        console.log(pages);
        checkAdminToken(pages);
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
      <p>ME GUSTA sHAKIRA</p>
      {isLoggedin
        ? <div><p>{`Bonjour ${blaz} !`}</p>{isAdmin ? <p>Tu es admin !</p> : <p>Tu n'es pas modérateur, contact le support</p>}</div>
        : <div className="login-homemade" onClick={onLoginClick}>
          <div className="fb-login-button" data-width="300" data-size="large" data-button-type="login_with" />
        </div>
      }
    </div>
  );
};

export default App;
