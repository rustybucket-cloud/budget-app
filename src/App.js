import './App.scss';

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';

import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Expenses from './components/Expenses/Expenses';
import AddExpense from './components/AddExpense/AddExpense';
import Login from './components/Profile/Login';
import Signup from './components/Profile/Signup';

function App() {
  // used to open mobile menu
  const [ nav, setNav ] = useState(false)
  const [ category, setCategory ] = useState(null)
  // sets nav wayfinding
  const [ active, setActive ] = useState(null)

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header setNav={setNav} nav={nav} active={active}/>
          <main className={nav ? "slide" : "slideBack"}>
          <Routes>
            <Route path="/" element={<Categories setCategory={setCategory} setActive={setActive} />} />
            <Route path="/expenses" element={<Expenses category={category} />} />
            <Route path="/addexpense" element={<AddExpense setActive={setActive} />}  />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
          </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
