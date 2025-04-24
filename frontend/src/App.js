import React from 'react';
import Button from './components/Button';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div>
      <Navbar/>
      <Button/>
      <Footer />
    </div>
  );
}

export default App;
