import React from 'react'
import Navbar from './components/Navbar'
import Search from './components/Search'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Display from './components/Display';
import Certifications from './components/Certifications';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import MyCertifications from './components/MyCertifications';
import ChangePassword from './components/ChangePassword';



const App = () => {
  const location = useLocation()
  return (
    <div className='min-h-screen bg-[#edede9] m-0 p-0'>
      <Navbar key={location.pathname}/>
      <Routes>
        <Route path='/' element={<Search/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/display' element={<Display/>}></Route>
        <Route path='/display/:id' element={<Certifications/>}></Route>
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/myCertifications' element={<MyCertifications/>}></Route>
        <Route path='/changePassword' element={<ChangePassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App