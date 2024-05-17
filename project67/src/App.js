import React from 'react'
import AllPages from './pages/AllPages'
import SessionProvider from './context/session'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/modal/Modal';
import NotificationProvider from './context/count';
export default function App() {
  return (
    <>
      <ToastContainer />
      <NotificationProvider>
        <SessionProvider>
          <AllPages />
        </SessionProvider>
      </NotificationProvider>

    </>
  )
}
