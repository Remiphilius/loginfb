import './App.css';

function App() {
  

  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      console.log("sadasdf");
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }	
  }

  function checkLoginState() {               // Called when a person is finished with the Login Button.
    window.FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v15.0&appId=419740503360817&autoLogAppEvents=1";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  return (
    <div className="App">
      <p>HUÎTRE au choc</p>
      <div className="fb-login-button" data-width="300" data-size="large"
        data-button-type="login_with" data-layout="default" data-auto-logout-link="false"
        data-use-continue-as="false" data-onlogin={checkLoginState}></div>
    </div>
  );
};

export default App;
