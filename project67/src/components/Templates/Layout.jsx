import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

export default function Layout(props) {
  return (
    <div className='wrapper'>

      <Sidebar />
      <Main>
        {
          props.children
        }
      </Main>

    </div>
  )
}
