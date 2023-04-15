import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

import Billboard from '@/components/Billboard'
import InfoModal from '@/components/InfoModal'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import useInfoModal from '@/hooks/useInfoModal'
import useMovieList from '../hooks/useMovieList'

export default function Home() {
  const { data: user } = useCurrentUser()
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} closeModal={closeModal} />
      <Navbar />
      <main className='pt-20'>
        <Billboard />
        <div className='pb-40'>
          <MovieList title={'Trending Now'} data={movies} />
          <MovieList title={'My Favorites List'} data={favorites} />
        </div>
        <div className='pt-20'>
          <p>Logged in as: {user?.name} </p>
          <button
            type='button'
            onClick={() => signOut()}
            className='mt-4 h-10 rounded-md bg-red-600 px-8 transition hover:bg-red-700 focus-visible:bg-red-700'
          >
            Sign out
          </button>
        </div>
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
