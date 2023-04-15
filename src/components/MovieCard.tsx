import Image from 'next/image'
import React, { useState } from 'react'

import { Movie } from '@prisma/client'
import FavoriteButton from './FavoriteButton'
import PlayButton from './PlayButton'

interface MovieCardProps {
  // data: Record<string, any>
  data: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleParentFocus = () => {
    setIsFocused(true)
  }

  const handleParentBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className='col-span group relative h-[12vw] bg-zinc-900'>
      <Image
        src={data.thumbnailUrl}
        alt={data.title}
        fill
        className='duration h-[12vw] w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-300
        focus-visible:opacity-90
        group-hover:opacity-90
        sm:group-hover:opacity-0
        sm:group-focus-visible:opacity-0'
      />
      <div
        // tabIndex={0}
        // ref={hiddenDivRef}
        className={`invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-300 duration-200 group-hover:-translate-y-[6vw]
        group-hover:translate-x-[1vw]
        group-hover:scale-110
        group-hover:opacity-100
        group-focus-visible:-translate-y-[6vw]
        group-focus-visible:translate-x-[1vw]
        group-focus-visible:scale-110
        group-focus-visible:opacity-100
        sm:visible
        ${isFocused ? '-translate-y-[6vw] translate-x-[1vw] scale-110 opacity-100' : ''}
      `}
      >
        {/* <Image
          src={data.thumbnailUrl}
          alt={data.title}
          fill
          className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw] min-h-[12vw]'
        /> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.thumbnailUrl}
          alt={data.title}
          className='duration h-[12vw] min-h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition'
        />
        {/* // ! with img text div is under  - OK
         // ! with Image text div on top of image - BAD */}
        <div
          // ref={hiddenDivRef}
          tabIndex={0}
          onFocus={handleParentFocus}
          onBlur={handleParentBlur}
          className='absolute z-10
        w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4'
        >
          <div className='flex items-center gap-3'>
            <PlayButton movieId={data.id} movieName={data.title} />
            <FavoriteButton movieId={data.id} />
          </div>
          <p className='mt-4 font-semibold text-green-400'>
            New <span className='text-white'>2023</span>
          </p>
          <p className='mt-1 font-semibold'>{data.title}</p>

          <div className='mt-4 flex items-center gap-2'>
            <p className='text-[11px] lg:text-sm'>{data.duration}</p>
          </div>
          <div className='mt-4 flex items-center gap-2'>
            <p className='text-[11px] lg:text-sm'>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
