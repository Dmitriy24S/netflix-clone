import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import useInfoModal from '@/hooks/useInfoModal'
import useMovie from '@/hooks/useMovie'
import FavoriteButton from './FavoriteButton'
import PlayButton from './PlayButton'

interface InfoModalProps {
  visible: boolean
  closeModal: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, closeModal }) => {
  const [isVisible, setIsVisible] = useState(!!visible) // ! turn into boolean

  const { movieId } = useInfoModal()
  const { data } = useMovie(movieId)
  // const { data = {} } = useMovie(movieId)

  // !
  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  // !
  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      closeModal()
    }, 300) // !
  }, [closeModal])

  if (!visible) {
    return null
  }

  if (!data) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 transition duration-300'>
      <div className='relative mx-auto w-auto max-w-3xl overflow-hidden rounded-md'>
        <div
          className={`${
            isVisible ? 'scale-100' : 'scale-0'
          } relative flex-auto transform bg-zinc-900 drop-shadow-md duration-300`}
        >
          <div className='relative h-96'>
            <video
              autoPlay
              muted
              loop
              poster={data.thumbnailUrl}
              src={data.videoUrl}
              className='h-full w-full object-cover brightness-[60%]'
            />
            <button
              type='button'
              aria-label='Close'
              onClick={handleClose}
              className='absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-70 transition hover:bg-opacity-40 focus-visible:bg-opacity-40'
            >
              <AiOutlineClose size={20} />
            </button>
            <div
              className='
            absolute
            bottom-[10%]
            left-10
            '
            >
              <p className='mb-8 h-full text-3xl font-bold md:text-4xl lg:text-5xl'>
                {data.title}
                {/* {data.title || ''} */}
                {/* // !  'data' is possibly 'undefined'. */}
              </p>
              <div className='flex items-center gap-4'>
                {/* // ! Type 'string | undefined' is not assignable to type 'string'. */}
                {/* <PlayButton movieId={data?.id || ''} movieName={data?.title} /> */}
                <PlayButton movieId={data.id} movieName={data.title} />
                <FavoriteButton movieId={data.id} />
              </div>
            </div>
          </div>

          <div className='px-12 py-8'>
            <div className='mb-4 flex justify-between'>
              <div className=''>
                <p className='text-lg'>{data.duration}</p>
                <p className='text-lg text-neutral-400'>{data.genre}</p>
              </div>
              <p className='text-lg font-semibold text-green-400'>New</p>
            </div>
            <p className='text-lg'>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
