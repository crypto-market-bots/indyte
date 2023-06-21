import React, { useEffect } from 'react'
import { Navigate, useRoutes,useNavigate} from 'react-router-dom';
import NavSection from './components/nav-section/NavSection'
import navConfig from './layouts/dashboard/nav/config'


export default function Protected(props) {
    const {Component}=props
    const navigate=useNavigate()
    useEffect(()=>{
        const login =localStorage.getItem('token')
        if(!login){
            navigate('/login')
        }
    })
  return (
    <div>
          <Navigate to="/dashboard/app" replace />
    </div>
  )
}
