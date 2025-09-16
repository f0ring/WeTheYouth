import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './page/HomePage';
import About from './page/About';
import Donate from './page/Donate';
import Contact from './page/contact';
import Causes from './page/Causes';
import TakeAction from './page/TakeAction';
import Profile from './page/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<contact />} />
            <Route path="/causes" element={<Causes />} />
            <Route path="/take-action" element={<TakeAction />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;