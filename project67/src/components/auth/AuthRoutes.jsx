import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function AuthRoutes(props) {
  if(props.isLogged) return <Navigate to={"/"} replace />
  return <Outlet/>
}
