import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsBell, BsChevronDown } from 'react-icons/bs'
import AccountMenu from './AccountMenu'
import MobileMenu from './MobileMenu'
import NavbarItem from './NavbarItem'

const TOP_OFFSET = 66

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  // const toggleMobileMenu = useCallback(()=> { setIsMobileMenuVisible((current) => !current)}, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className='fixed z-40 w-full'>
      <div
        className={`
      flex items-center px-4 py-6 transition duration-500 md:px-16
      ${showBackground ? 'bg-zinc-900/90' : ''}
      `}
      >
        <Image src='/images/logo.png' alt='Netflix' width={100} height={50} priority />
        <ul className='ml-8 hidden space-x-4 lg:flex'>
          <NavbarLinks />
        </ul>

        <div className='relative ml-4 flex h-6 items-center sm:ml-8 lg:hidden'>
          <button
            type='button'
            onClick={() => setIsMobileMenuVisible((currentState) => !currentState)}
            className='flex items-center overflow-hidden text-sm hover:text-zinc-300 focus-visible:text-zinc-300'
          >
            Browse
            <BsChevronDown
              className={`ml-1 transition ${
                isMobileMenuVisible ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {/* <MobileMenu isVisible={isMobileMenuVisible} /> */}
          {isMobileMenuVisible && (
            <MobileMenu>
              <NavbarLinks />
            </MobileMenu>
          )}
        </div>

        <div className='ml-auto flex items-center space-x-2 sm:space-x-6'>
          <button
            aria-label='Search'
            className='text-gray-200 hover:text-gray-300 focus-visible:text-gray-300'
          >
            <AiOutlineSearch size={22} />
          </button>
          <button
            aria-label='Notifications'
            className='text-gray-200 hover:text-gray-300 focus-visible:text-gray-300'
          >
            <BsBell size={18} />
          </button>
          <div className='relative'>
            <button
              aria-label='Account Menu'
              onClick={() => setIsAccountMenuVisible((current) => !current)}
              className='flex h-6 items-center space-x-2 overflow-hidden hover:text-gray-300'
            >
              <Image
                src='/images/default-blue.png'
                width={24}
                height={24}
                alt='Profile'
                // fill
                priority
                className='rounded-md'
              />
              <BsChevronDown
                className={`transition ${
                  isAccountMenuVisible ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
            <AccountMenu isVisible={isAccountMenuVisible} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

interface NavbarLinksProps {
  isMobileMenu?: boolean
}

export const NavbarLinks: React.FC<NavbarLinksProps> = ({ isMobileMenu }) => (
  <>
    <NavbarItem isMobileMenu={isMobileMenu} label='Home' url='/' />
    <NavbarItem isMobileMenu={isMobileMenu} label='Series' url='/series' />
    <NavbarItem isMobileMenu={isMobileMenu} label='Films' url='/films' />
    <NavbarItem isMobileMenu={isMobileMenu} label='New & Popular' url='/newpopular' />
    <NavbarItem isMobileMenu={isMobileMenu} label='My List' url='/mylist' />
    <NavbarItem isMobileMenu={isMobileMenu} label='Browse by languages' url='/browse' />
  </>
)
