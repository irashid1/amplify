import './styles/sass/App.scss';
import GetMusic from './componets /GetMusic';
import LoginModal from './componets /LoginModal';
import Header from './componets /Header';
import Footer from './componets /Footer';
import Contacts from './componets /Contacts';

// React Hooks
import {  useEffect, useState, useCallback  } from 'react';


// Firebase
import fire from './firebase.js';

function App() {
  
  const [user, setUser ] = useState("")
  const [email, setEmail ] = useState("")
  const [password, setPassword ] = useState("")
  const [emailError, setEmailError ] = useState("")
  const [passwordError, setPasswordError ] = useState("")
  const [hasAccount, setHasAccount ] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");

  const [userInput, setUserInput] = useState("");

  const [stopMusic, setStopMusic] = useState(false);

  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setUserInput("");
    setSearchTerm(""); 
  };
  
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (e) => {
    clearErrors();
    e.preventDefault()
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error)=> {
        switch(error.code) {
          case "auth/invalid-email": 
          case "auth/user-disabled": 
          case "auth/user-not-found":
            setEmailError(error.message);
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
            break;

            default:
        }
      });
  };

  const handleSignUp = (e) => {
    clearErrors();
    e.preventDefault()
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
            break;

          default:
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
    clearInputs(); 
    setStopMusic(true);
    setHamburgerMenu(false);
  }
  
  
  // const googleLogin = () => {
  //   const provider = fire.auth.GoogleAuthProvider();
  //   fire.auth().signInWithPopup(provider)
  //   .then( (e)=>{
  //     console.log(e)
  //   })
  //   .catch( (err)=> {
  //     console.log(err)
  //   })
  // }

  const authListener = useCallback( () => {
    fire
    .auth()
    .onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        setShowModal(false);
        setStopMusic(false);
      } 
      else {
        setUser("")
        // setShowModal(true)
      }
    })
  },[])  

  useEffect( () => {
    authListener();
  },[authListener]);

  return (
    <div className="App">
      <header className="App-header">
          <Header handleLogout={handleLogout} setShowModal={setShowModal} user={user} setHasAccount={setHasAccount} hamburgerMenu={hamburgerMenu} setHamburgerMenu={setHamburgerMenu} />
      </header>

      <main>
        <GetMusic user={user} setShowModal={setShowModal} searchTerm={searchTerm} setSearchTerm={setSearchTerm} userInput={userInput} setUserInput={setUserInput} stopMusic={stopMusic} />
      
          <LoginModal email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignUp={handleSignUp} emailError={emailError} passwordError={passwordError} hasAccount={hasAccount} setHasAccount={setHasAccount} user={user} showModal={showModal} setShowModal={setShowModal} />

      </main>

      <footer>
          <Contacts />
          <Footer />
      </footer>
         
    </div>
  );
}

export default App;

// Styling App

// THEME

// - choosing color palettes $$ 
//  * coolors and colorhunt 

// - choosing font $$
//  * use google fonts

// - create name and logo $$
//  * use react icons (headphones) to create a logo
//  * rounded theme (kinda like apple)

// possible name $$
// - amplify-music

// SCSS & JSX

// - create wireframe & creating partials $$
//  * login area, main page, album art, header, footer

// - media queries $$
//  * possible flex direction switch on media query 

// - media player $$
//  * add album art, artist and track name to media player

// - footer $$
//  * add media links and desgined by

// - header - SCRAP
//  * add welcome with users email
//  * find a way to display everything before the @ sign
//  * add user icon

// - main/ landing page $$
//  * moving liner gradient background 
//  * content - basic call to action 

// - main/ after search $$
//  * album art use react spring carosul 


// possible issues 
// - adding visual to modal to help distinguish log in and sign up SCRAP
// - adding icons for footer and getting icons to animate into text on hover SCRAP
// - adding a fullscreen mode SCRAP
// - react spring animation using "useTranstion" from both modal and media player SCRAP

// - clearing search and stoping playing music on logout $$ $$
// - when song finishes playing start next song $$
// - add page index to display $$ 
// - enable playback for index[0] on coverflow $$
// - move the page arrows below the coverflow $$
// - wrapping the coverflow in a new div $$

// - volume controls in media player $$
// - disable page button on index 0 $$
// - make the visibility of h3 and h4 to none when track is not selected $$

// Final to do list
// - when songlist changes, set the index to [0] $$
// - if user selects a track, turn that track into the current album cover $$
// - pagination buttons $$
// - 0 index track cant be click due to swiper wrapper $$
// - song title scroll $$
// - adding more effective error handling $$


// - add Oauth 
// - bug fixes on scrub for mobile devices

// - leave comments in html for all the resource that we used
//  * media player- Ryan from lets build ui 
//  * firebase auth- Youtube h3 web dev tuts
//  * spring carousal 






