import './App.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Expenses from './components/Expenses/Expenses';

function App() {
  // used to open mobile menu
  const [ nav, setNav ] = useState(false)
  const [ category, setCategory ] = useState(null)

  return (
    <div className="App">
      <Header setNav={setNav} nav={nav}/>
      <main className={nav ? "slide" : "slideBack"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Categories setCategory={setCategory} />} />
            <Route path="/expenses" element={<Expenses category={category} />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
