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
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './page/AdminPanel';
import SessionTimer from './components/SessionTimer'; // Session Timer import

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* Public routes */}
              <Route path='/' element={<Home />} />
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
              
              {/* Protected Admin route */}
              <Route path='/admin' element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Session Timer - This should be outside Routes but inside Router */}
          <SessionTimer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;