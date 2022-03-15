import './styles/sass/App.scss';
import GetMusic from './componets /GetMusic';
import LoginModal from './componets /LoginModal';
import {  useEffect, useState, useCallback  } from 'react'

// firebase
import fire from './firebase.js';

console.log(fire)



function App() {
  
  const [user, setUser ] = useState("")
  const [email, setEmail ] = useState("")
  const [password, setPassword ] = useState("")
  const [emailError, setEmailError ] = useState("")
  const [passwordError, setPasswordError ] = useState("")
  const [hasAccount, setHasAccount ] = useState(false)
  
  console.log(emailError)
  console.log(passwordError)
  // const [showModal, setShowModal] = useState(false)

  const clearInputs = () => {
    setEmail("");
    setPassword("");
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
  }

  const authListener = useCallback( () => {
    fire
    .auth()
    .onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user)
        // setShowModal(false)
      } 
      else {
        setUser("")
        // setShowModal(true)
      }
    })
  },[])  

  // const authListener = () => {
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user)
  //       // setShowModal(false)
  //     } else {
  //       setUser("")
  //       // setShowModal(true)
  //     }
  //   })
  // }

 

  useEffect( () => {
    authListener();
  },[authListener]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music App</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
        {user ? 
          <GetMusic />
        
        :
          <LoginModal email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignUp={handleSignUp} emailError={emailError} passwordError={passwordError} hasAccount={hasAccount} setHasAccount={setHasAccount} user={user} setUser={setUser}/>

        }
          
    </div>
  );
}

export default App;

// Styling App

// THEME

// - choosing color palettes 
//  * coolors and colorhunt

// - choosing font
//  * use google fonts

// - create name and logo
//  * use react icons (headphones) to create a logo
//  * rounded theme (kinda like apple)

// SCSS & JSX

// - create wireframe & creating partials 
//  * login area, main page, album art, header, footer

// - media queries 
//  * possible flex direction switch on media query 

// - media player 
//  * add album art, artist and track name to media player

// - footer
//  * add media links and desgined by

// - header
//  * add welcome with users email
//  * find a way to display everything before the @ sign

// - main/ landing page  
//  * moving liner gradient background 
//  * content - basic call to action 

// - main/ after search 
//  * album art use react spring carosul 

// - leave comments in html for all the resource that we used
//  * media player- Ryan from lets build ui 
//  * firebase auth- Youtube h3 web dev tuts






