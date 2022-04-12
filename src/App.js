import './App.scss';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';

import Header from './components/Header/Header';
const Categories = React.lazy(() => import('./components/Categories/Categories'));
const Expenses = React.lazy(() => import('./components/Expenses/Expenses'));
const AddExpense = React.lazy(() => import('./components/AddExpense/AddExpense'));
const Login = React.lazy(() => import('./components/Profile/Login'));
const Signup = React.lazy(() => import('./components/Profile/Signup'));

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
          <React.Suspense fallback={<p>Loading</p>}>
            <Routes>
              <Route path="/" element={<Categories setCategory={setCategory} setActive={setActive} />} />
              <Route path="/expenses/:name" element={<Expenses category={category} />} />
              <Route path="/addexpense" element={<AddExpense setActive={setActive} />}  />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />}/>
            </Routes>
          </React.Suspense>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
