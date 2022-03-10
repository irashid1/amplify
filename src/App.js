import './styles/sass/App.scss';
import GetMusic from './componets /GetMusic';
import Modal from './componets /Modal';
import { userEmail, userPassword, userName } from './componets /Modal';
import {useEffect, useState } from 'react'

// firebase
import firebase from './firebase.js';
import { getDatabase, ref, onValue, set } from "firebase/database";

function App() {
  
  const [showModal, setShowModal] = useState(false)

  const [userInfo, setUserInfo] = useState({});

  console.log(userInfo);

  useEffect( () => {
    setTimeout( ()=> {
      setShowModal(true)
    },[2000])
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music App</h1>
        <GetMusic />
      </header>
      <Modal showModal={showModal} setShowModal={setShowModal} setUserInfo={setUserInfo}/>
    </div>
  );
}

export default App;


