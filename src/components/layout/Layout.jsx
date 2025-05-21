import React from 'react'
import Header from '../navbar/Navbar'
import Footer from '../footer/Footer'

function Layout({children}) {
  return (
    <div className="relative">
        <Header className="fixed top-0 left-0 w-full z-10 bg-white shadow-md"/>
        <div className="content ">
            {children}
        </div>
        <Footer/>
      
    </div>
  )
}

export default Layout