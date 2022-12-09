import './App.css';

function App() {


  // function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  //   console.log('statusChangeCallback');
  //   console.log(response);                   // The current login status of the person.
  //   if (response.status === 'connected') {   // Logged into your webpage and Facebook.
  //     console.log("sadasdf");
  //   } else {                                 // Not logged into your webpage or we are unable to tell.
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into this webpage.';
  //   }	
  // }

  // function checkLoginState() {               // Called when a person is finished with the Login Button.
  //   console.log("checkLoginState");
  //   window.FB.getLoginStatus(function(response) {   // See the onlogin handler
  //     statusChangeCallback(response);
  //   });
  // }  window.fbAsyncInit = function() {
  window.FB.init({
    appId: '419740503360817',
    cookie: true,
    xfbml: true,
    version: 'v15.0'
  });

  //   FB.AppEvents.logPageView();

  // };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });


  function checkLoginState() {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  return (
    <div className="App">
      <p>HUÎTRE au choc</p>
      <fb:login-button
        scope="public_profile,email"
        onlogin="checkLoginState();">
      </fb:login-button>
    </div>
  );
};

export default App;
