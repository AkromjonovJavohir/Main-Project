import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../components/auth/PrivateRoutes'
import AuthRoutes from '../components/auth/AuthRoutes'
import { useContext } from 'react'
import { SessionContext } from '../context/session'
import { AuthRouter, PrivateRouter } from '../config/router'

export default function AllPages() {
  const [session,setSession] = useContext(SessionContext);
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoutes isLogged={session.isLogged} />} >
          {
            PrivateRouter.map(item => <Route key={item.kay} path={item.path} element={item.element} />)
          }
        </Route>
        <Route path='/' element={<AuthRoutes isLogged={session.isLogged} />} >
        {
            AuthRouter.map(item => <Route key={item.kay} path={item.path} element={item.element} />)
          }
        </Route>
      </Routes>
    </>
  )
}
