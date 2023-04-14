import Link from 'next/link'
import React from 'react'

interface NavbarItemProps {
  label: string
  url: string
  isMobileMenu?: boolean
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, url, isMobileMenu }) => {
  return (
    <li className='list-none'>
      <Link
        href={url}
        className={[
          'hover:text-zinc-300 focus-visible:text-zinc-300 ',
          isMobileMenu ? 'py-1 hover:underline' : 'transition',
        ].join(' ')}
      >
        {label}
      </Link>
    </li>
  )
}

export default NavbarItem
