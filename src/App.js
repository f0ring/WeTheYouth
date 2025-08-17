
import Navbarr from './components/navbar';
import HomePage from './page/HomePage';
import Contact from './page/contact';
import About from './page/about';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbarr />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<Contact />}>
            <Route path='about/:id' element={<About />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;