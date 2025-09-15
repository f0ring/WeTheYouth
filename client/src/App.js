import Navbarr from './components/navbar';
import HomePage from './page/HomePage';
import Contact from './page/contact';
import About from './page/About';
import Causes from './page/Causes';
import TakeAction from './page/TakeAction';
import Donate from './page/Donate';
import Profile from './page/Profile'; // ADD THIS IMPORT
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // ADD THIS IMPORT
import AdminPanel from './page/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbarr />
          <Routes>
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
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;