import React from 'react'
import { Route, Routes } from 'react-router-dom'
import List from './components/List'
import AddItems from './components/Additems'
import Order from './components/Order'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </>
  )
}

export default App

       
  
