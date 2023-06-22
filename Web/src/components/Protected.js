import { React, useEffect } from 'react';
import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// import {  } from 'react';



export default function Protected(props) {
    const {Component} =props
    console.log(Component)
    const navigate = useNavigate();
    useEffect(()=>{
         const login = localStorage.getItem('token');
         if (!login) {
           navigate('/login');
         }
    })
    


  return (
     <Navigate to={Component}  />
  )
}
