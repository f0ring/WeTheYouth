import logo from './logo.svg';
import './App.css';
import Navbarr from './components/navbar';
import Home from './page/home';
import Contact from './page/contact';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './page/about';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbarr></Navbarr>
      </div>

      <div>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/contact' element={<Contact/>}>
            <Route path='about/:id' element={<About/>}/> 
          </Route>
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;