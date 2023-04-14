import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Profiles = () => {
  const router = useRouter()
  const { data: user } = useCurrentUser()

  return (
    <div className='flex h-full items-center justify-center '>
      <div className='flex flex-col '>
        <h1 className='text-center text-3xl md:text-6xl'>Who is watching?</h1>
        <div className='mt-10 flex items-center justify-center gap-8'>
          <button
            onClick={() => router.push('/')}
            className='group mx-auto flex flex-col items-center justify-center  outline-none '
          >
            {/* <img src='images/default-blue.png' alt='user' /> */}
            <Image
              src='/images/default-blue.png'
              alt='Profile'
              height={176}
              width={176}
              className='h-44 w-44 rounded-md border-2 border-transparent group-hover:border-white group-focus-visible:border-white'
            />
            <div className='transtition mt-4 text-center text-2xl text-gray-400 group-hover:text-white group-focus-visible:text-white'>
              {user?.name}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profiles

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
