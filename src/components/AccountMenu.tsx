import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface AccountMenuProps {
  isVisible: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isVisible }) => {
  const { data } = useCurrentUser()

  if (!isVisible) {
    return null
  }

  return (
    <div className='absolute right-0 top-8 z-40 flex w-56 flex-col border-2 border-zinc-800 bg-black pb-5 pt-7'>
      <div className='flex flex-col gap-3'>
        <div className='group/item flex h-5 w-full cursor-pointer items-center space-x-3 px-4'>
          <Image
            src='/images/default-blue.png'
            alt='Profile'
            width={24}
            height={24}
            className='rounded-md'
            // fill
          />
          <p className='text-sm group-hover/item:underline'>{data?.name}</p>
        </div>
        <hr className='my-4 h-px border-0 bg-gray-600' />
        <button className='mx-4 h-full rounded-md bg-red-600 p-3 text-center text-sm hover:bg-red-700 hover:underline'>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default AccountMenu
