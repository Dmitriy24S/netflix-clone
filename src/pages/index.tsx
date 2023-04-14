import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: user } = useCurrentUser()

  return (
    <div>
      <h1 className='text-4xl text-red-600'>Netflix Clone</h1>
      <p>Logged in as: {user?.name} </p>
      <button
        type='button'
        onClick={() => signOut()}
        className='mt-4 h-10 rounded-md bg-red-600 px-8 transition hover:bg-red-700 focus-visible:bg-red-700'
      >
        Sign out
      </button>
    </div>
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
