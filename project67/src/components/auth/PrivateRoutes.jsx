import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../Templates/Layout'

export default function PrivateRoutes(props) {
  if(!props.isLogged) return <Navigate to={"/login"} replace />
  return <Layout> <Outlet/> </Layout>
}
