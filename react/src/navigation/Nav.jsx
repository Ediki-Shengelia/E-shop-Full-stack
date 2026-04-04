import React from 'react'
import { path } from '../routes/path'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to={path.home}>Stud<span>Social</span></Link>
          </div>
          
          <div className="nav-links">
            <Link 
              to={path.home} 
              className={`nav-item ${location.pathname === path.home ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to={path.login} 
              className={`nav-item ${location.pathname === path.login ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link 
              to={path.register} 
              className="nav-btn-register"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Nav