import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Crud from './Crud'
import Add from './Add'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Crud />} />
      <Route path = '/add' element={<Add />} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
