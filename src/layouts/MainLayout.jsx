import React from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MainLayout = ({children}) => {
  return (
      <div>
          <header>
              <nav className="navbar" style={{ background:"rgba(2, 85, 162)"}}>
                  <div className="container">
                      <NavLink to="/" className="navbar-brand text-light" >NexsusBerry Mart</NavLink>
                  </div>
              </nav>
          </header>
          <main>
              <div className='container mt-3'>
                  {children}
              </div>
              <ToastContainer/>
          </main>
      </div>
  )
}

export default MainLayout