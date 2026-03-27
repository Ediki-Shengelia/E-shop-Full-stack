import React from 'react'
import { path } from '../routes/path'
import {Link,Outlet} from 'react-router-dom'
const Nav = () => {
  return (
    <div>
      <Link to={path.home}>Home</Link>
      <Link to={path.login}>Login</Link>
      <Link to={path.register}>Register</Link>
      <hr />
      <Outlet/>
    </div>
  )
}

export default Nav
