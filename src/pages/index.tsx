import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: user } = useCurrentUser()

  return (
    <>
      <Navbar />
      <main className='pt-20'>
        <p>Logged in as: {user?.name} </p>
        <button
          type='button'
          onClick={() => signOut()}
          className='mt-4 h-10 rounded-md bg-red-600 px-8 transition hover:bg-red-700 focus-visible:bg-red-700'
        >
          Sign out
        </button>
      </main>
    </>
  )
}

// protect home route when no session active // !
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
