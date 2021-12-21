import './App.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Expenses from './components/Expenses/Expenses';
import AddExpense from './components/AddExpense/AddExpense';

function App() {
  // used to open mobile menu
  const [ nav, setNav ] = useState(false)
  const [ category, setCategory ] = useState(null)
  // sets nav wayfinding
  const [ active, setActive ] = useState(null)

  return (
    <div className="App">
        <BrowserRouter>
          <Header setNav={setNav} nav={nav} active={active}/>
          <main className={nav ? "slide" : "slideBack"}>
          <Routes>
            <Route path="/" element={<Categories setCategory={setCategory} setActive={setActive} />} />
            <Route path="/expenses" element={<Expenses category={category} />} />
            <Route path="/addexpense" element={<AddExpense setActive={setActive} />}  />
          </Routes>
          </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
