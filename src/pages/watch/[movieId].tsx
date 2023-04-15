import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import useMovie from '@/hooks/useMovie'

const Watch = () => {
  const router = useRouter()
  const { movieId } = router.query
  const { data } = useMovie(movieId as string)

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed z-10 flex w-full items-center gap-8 bg-black/70 p-4'>
        <button
          aria-label='Back'
          type='button'
          onClick={() => router.push('/')}
          className='rounded-full transition hover:opacity-90'
        >
          <AiOutlineArrowLeft size={30} />
        </button>
        <p className='text-xl font-bold md:text-3xl'>
          <span className='mr-1 font-light'>Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        src={data?.videoUrl} // ! no autocomplete -> prisma generate fix
        className='h-full w-full'
      />
    </div>
  )
}

export default Watch
