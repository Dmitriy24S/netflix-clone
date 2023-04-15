import { useRouter } from 'next/router'
import React from 'react'
import { BsPlayFill } from 'react-icons/bs'

interface PlayButtonProps {
  movieId: string
  movieName: string
  withText?: boolean
}

const PlayButton: React.FC<PlayButtonProps> = ({
  movieId,
  movieName,
  withText = false,
}) => {
  const router = useRouter()

  return (
    <button
      aria-label={`Play ${movieName}`}
      type='button'
      onClick={() => router.push(`/watch/${movieId}`)}
      className={[
        'flex cursor-pointer items-center justify-center bg-white text-gray-950 transition hover:bg-neutral-300',
        withText
          ? 'rounded-md px-2 py-1 text-xs font-semibold md:px-4 md:py-2 lg:text-lg'
          : 'h-6 w-6 rounded-full lg:h-10 lg:w-10',
      ].join(' ')}
    >
      <BsPlayFill size={20} />
      {withText && <div className='ml-1'>Play</div>}
    </button>
  )
}

export default PlayButton
