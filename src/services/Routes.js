import React from 'react'
import { RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import UserPanel from '../components/UserPanel'
import SingleEvent from "../components/SingleEvent";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const RoutesComponent = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/user'} element={
          <RequireAuth loginPath={'/login'}>
            <UserPanel/>
          </RequireAuth>
        }/>
          <Route path={'/register'} element={<Register/>}/>
        <Route path={'/event/:id'} element={<SingleEvent/>}/>

      </Routes>

    </BrowserRouter>
  )
}

export default RoutesComponent
