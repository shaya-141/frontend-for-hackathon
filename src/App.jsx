import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/login'
import Signup from './page/signup'
import Home from './page/Home'
import Slip from './page/Slip'
import DepartmentManger from './page/DepartmentManager'
import AdminPanel from './page/AdminPanel'
import { UserContextProvider } from './Context/userAuth'

function App() {
  

  return (
    <>
    <UserContextProvider>

     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='adminpanel' element={<AdminPanel></AdminPanel>}></Route>
        <Route path='slip/:token' element={<Slip></Slip>}></Route>
        <Route path='/department-manager' element={<DepartmentManger></DepartmentManger>}></Route>
      </Routes>
     
     </BrowserRouter>
    </UserContextProvider>
    </>
  )
}

export default App
