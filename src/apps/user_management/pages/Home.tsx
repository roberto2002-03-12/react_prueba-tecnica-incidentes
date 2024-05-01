// import React from 'react'
import { NavBar } from '../components'
import '../styles/HomeStyle.css';

// um: user management

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className='um-home'>
        <div className='um-home-explain'>
          <h2>Registro de incidencias</h2>
        </div>
      </div>
    </>
  )
}
