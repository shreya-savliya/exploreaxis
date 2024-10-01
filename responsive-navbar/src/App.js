import React from 'react';
import Navbar from './components/Navbar'; // Import the Navbar component
import './App.css'; // Existing CSS
import './styles.css'; // New CSS for Navbar

function App() {
  return (
    <div className="App">
      {/* Navbar component */}
      <Navbar />

      {/* Original React Logo and content */}
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
