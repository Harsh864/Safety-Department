import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import QRCode from './components/QR/QRCode';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/qr' element={<QRCode/>} />
      </Routes>
      
      
    </div>
  );
}

export default App;
