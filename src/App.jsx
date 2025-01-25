import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/login'
import Signup from './page/signup'
import Home from './page/home'
import Slip from './page/Slip'
import DepartmentManger from './page/DepartmentManager'
import AdminPanel from './page/AdminPanel'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='adminpanel' element={<AdminPanel></AdminPanel>}></Route>
        <Route path='slip/:token' element={<Slip></Slip>}></Route>
        <Route path='/department-manger' element={<DepartmentManger></DepartmentManger>}></Route>
      </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
