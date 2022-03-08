import './styles/sass/App.scss';
import GetMusic from './componets /GetMusic';
import Modal from './componets /Modal';
import {useEffect, useState } from 'react'

function App() {

  const [showModal, setShowModal] = useState(false)

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
      <Modal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
}

export default App;


