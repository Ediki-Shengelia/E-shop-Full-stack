import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import {path} from '../routes/path'
import{PacmanLoader} from 'react-spinners'
import { AuthContext } from './AuthContext'
const GuestRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    if(loading)return <PacmanLoader color='red'/> 
    if(user)return <Navigate to={path.dashboard} replace/>
    return children;
}

export default GuestRoute
