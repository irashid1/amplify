import './styles/sass/App.scss';
import GetMusic from './componets /GetMusic';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music App</h1>
        <GetMusic />
      </header>
    </div>
  );
}

export default App;


// Create form for users search choices
  // -submit on form
  // -on change and value on input field 

// Users login area 

// Create feature that saves users song choice to personal playlist via firebase

// possibly use node.js instead of firebase 

// create a randomize feature, artist search and track search that gives the user five tracks based on input
  // - using the offset, we can create a randomize function that will give us 5 different results every time
  // - using the same variable we can also create pages of results by adding or subtracting from the offset

// second feature: this will allow user to search any random word and get back music based on that word

// having one common fixed playback bar for all the results using a variable for the track and moving the audio outside of the map

// add react router dom 

// from a stylistic perspective
  // - try to implement spotify cards
  // - we should try and implement gradients between the randomize, artist and track categories, and try to "transition" as smoothly as possible
  



