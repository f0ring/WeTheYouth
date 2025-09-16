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
// import AdminPanel from './page/AdminPanel'; // Comment out for now
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/causes' element={<Causes />} />
            <Route path='/take-action' element={<TakeAction />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/contact' element={<Contact />} />
            
            {/* Nested about route */}
            <Route path='/contact/about/:id' element={<About />} />
            
            {/* Protected Profile route */}
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Protected Admin route - Comment out for now */}
            {/*
            <Route path='/admin' element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;