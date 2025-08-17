
import Navbarr from './components/navbar';
import HomePage from './page/HomePage';
import Contact from './page/contact';
import About from './page/about';
import Causes from './page/Causes';
import TakeAction from './page/TakeAction';
import Donate from './page/Donate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbarr />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/causes' element={<Causes />} />
          <Route path='/take-action' element={<TakeAction />} />
          <Route path='/donate' element={<Donate />} />
          <Route path='/contact' element={<Contact />}>
            <Route path='about/:id' element={<About />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;