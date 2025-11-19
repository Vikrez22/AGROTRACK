import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RoleRoute = ({children, allowed}) => {
  
    const { 
        user,  
        role, 
        loading, 
        isAuthenticated 
    } = useAuth()
  
    if (loading) return <div>loading</div>

    if (!isAuthenticated) return <Navigate to={'/login'} />

    if(!allowed.includes(role)) return <Navigate to={'/not-authorized'} />
    
  
    return children 
  
}

export default RoleRoute