import { ReactNode } from 'react'
import { NavBar } from '../../user_management/components'
import '../styles/LayoutStyle.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className='incidente-admin-layout'>
        {children}
      </div>
    </>

  )
}
