import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Protectedlayout = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-slate-50 
    text-slate-900 flex flex-col font-sans bg-[url('/layout_bg.png')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Protectedlayout