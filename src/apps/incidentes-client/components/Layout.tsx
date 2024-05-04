import { ReactNode } from 'react'
import { NavBar } from './'
import '../styles/LayoutStyle.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className='incidente-client-layout'>
        {children}
      </div>
    </>

  )
}
