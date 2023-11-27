import React from 'react'
import { RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SecureComponent from './components/SecureComponent'
import SingleEvent from "./components/SingleEvent";
import Navbar from "./components/Navbar";

const RoutesComponent = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/secure'} element={
          <RequireAuth loginPath={'/login'}>
            <SecureComponent/>
          </RequireAuth>
        }/>
        <Route path={'/event/:id'} element={<SingleEvent/>}/>

      </Routes>

    </BrowserRouter>
  )
}

export default RoutesComponent
