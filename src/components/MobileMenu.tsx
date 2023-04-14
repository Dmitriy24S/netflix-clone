import React from 'react'
import { NavbarLinks } from './Navbar'

interface MobileMenuProps {
  // isVisible?: boolean
  children: React.ReactNode
}

const MobileMenu: React.FC<MobileMenuProps> = ({ children }) => {
  // if (!isVisible) {
  //   return null
  // }

  return (
    <div className='absolute -left-16 top-8 flex w-56 flex-col border-2 border-zinc-800 bg-black py-5 '>
      <div className='flex flex-col space-y-2 text-center '>
        {/* <NavbarLinks isMobileMenu /> */}
        {children}
      </div>
    </div>
  )
}

export default MobileMenu
