import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CameraView from './components/CameraView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <h1 style={{ textAlign: 'center' }}>Eye Monitoring AI</h1>
      <CameraView />
      <Footer />
    </div>
  );
}

export default App;
