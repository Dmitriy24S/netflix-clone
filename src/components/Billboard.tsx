import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import useBillboard from '../hooks/useBillboard'

const Billboard = () => {
  const { data } = useBillboard()

  return (
    <div className='relative h-[56.25vw]'>
      <video
        poster={data?.thumbnailUrl} // ! no autocomplete no type? -> npx prisma generate
        src={data?.videoUrl}
        autoPlay
        muted
        loop
        className='h-[56.25vw] w-full object-cover brightness-[60%]'
      />
      <div className='absolute top-[30%] ml-4 md:top-[40%] md:ml-16'>
        <p className='h-full w-[50%] text-xl font-bold drop-shadow-xl md:text-5xl lg:text-6xl'>
          {data?.title}
        </p>
        <p className='mt-3 w-[90%] text-sm drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]'>
          {data?.description}
        </p>
        <div className='mt-3 flex items-center space-x-3 md:mt-4'>
          <button
            type='button'
            className='flex w-auto items-center rounded-md bg-white bg-opacity-30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-opacity-20 md:px-4 md:py-2 lg:text-lg'
          >
            <AiOutlineInfoCircle className='mr-1' />
            More info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard