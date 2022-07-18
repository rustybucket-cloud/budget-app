/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoriesProvider } from './contexts/CategoriesProvider';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { jsx, css } from '@emotion/react';
import { Auth0Provider } from "@auth0/auth0-react"

import { Header, ProtectedRoute } from './components'
const Categories = React.lazy(() => import('./views/Categories/Categories'));
const Expenses = React.lazy(() => import('./views/Expenses/Expenses'));
const AddExpense = React.lazy(() => import('./views/AddExpense/AddExpense'));
const Login = React.lazy(() => import('./views/Login/Login'));
const Signup = React.lazy(() => import('./views/Login/Signup'));

const client = new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_API_LOCATION,
  cache: new InMemoryCache()
})

const appStyle = css`
  background-color: ${theme.palette.primary.main};
  min-height: 100vh;
`

const mainStyle = css`
  max-width: ${theme.breakpoints.xl};
  margin: auto;
  padding: 0 ${theme.spacing(4)};
`

function App() {
  // used to open mobile menu
  const [ nav, setNav ] = useState(false)
  const [ category, setCategory ] = useState(null)
  // sets nav wayfinding
  const [ active, setActive ] = useState(null)

  return (
    <div className="App" css={appStyle}>
      <ApolloProvider client={client}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH_DOMAIN}
          clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
          redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URL}
        >
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Header setNav={setNav} nav={nav} active={active}/>
              <main className={nav ? "slide" : "slideBack"} css={mainStyle}>
              <React.Suspense fallback={<p>Loading</p>}>
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Categories setCategory={setCategory} setActive={setActive} />
                    </ProtectedRoute>} 
                  />
                  <Route path="/expenses/:name" element={
                    <ProtectedRoute>
                      <Expenses category={category} />
                    </ProtectedRoute>} 
                  />
                  <Route path="/addexpense" element={
                    <ProtectedRoute>
                      <AddExpense setActive={setActive} />
                    </ProtectedRoute>}  
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />}/>
                </Routes>
              </React.Suspense>
              </main>
            </BrowserRouter>
          </ThemeProvider>
        </Auth0Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
