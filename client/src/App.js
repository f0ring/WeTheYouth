import Navbarr from './components/navbar';
import HomePage from './page/HomePage';
import Contact from './page/contact';
import About from './page/About';
import Causes from './page/Causes';
import TakeAction from './page/TakeAction';
import Donate from './page/Donate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './page/Profile';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbarr />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            
            {/* Protected Routes */}
            <Route path='/causes' element={
              <ProtectedRoute>
                <Causes />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
  <ProtectedRoute>
   <Profile />
  </ProtectedRoute>
 } />
            <Route path='/take-action' element={
              <ProtectedRoute>
                <TakeAction />
              </ProtectedRoute>
            } />
            <Route path='/donate' element={
              <ProtectedRoute>
                <Donate />
              </ProtectedRoute>
            } />
            <Route path='/contact' element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }>
              <Route path='about/:id' element={<About />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;