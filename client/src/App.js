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
<<<<<<< HEAD
import Donate from './page/Donate';
import Profile from './page/Profile'; // ADD THIS IMPORT
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // ADD THIS IMPORT
import AdminPanel from './page/AdminPanel';
=======
import Profile from './page/Profile';
import './App.css';
>>>>>>> 44b57f813483e2e980c5166861199340798560b1

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
<<<<<<< HEAD
            {/* Public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/causes' element={<Causes />} />
            <Route path='/take-action' element={<TakeAction />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/contact' element={<Contact />}>
              <Route path='about/:id' element={<About />} />
              
            </Route>
            
            {/* Protected Profile route */}
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/admin' element={
  <ProtectedRoute>
    <AdminPanel />
  </ProtectedRoute>
} />
=======
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<contact />} />
            <Route path="/causes" element={<Causes />} />
            <Route path="/take-action" element={<TakeAction />} />
            <Route path="/profile" element={<Profile />} />
>>>>>>> 44b57f813483e2e980c5166861199340798560b1
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;