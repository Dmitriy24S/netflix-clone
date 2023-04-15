import { isEmpty } from 'lodash'
import React from 'react'

import { Movie } from '@prisma/client'
import MovieCard from './MovieCard'

interface MovieListProps {
  // data: Record<string, any>[]
  data: Movie[]
  title: string
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null
  }

  return (
    <div className='mt-4 space-y-8 px-4 md:px-12'>
      <div>
        <p className='text-md mb-4 font-semibold md:text-xl lg:text-2xl'>{title}</p>
        <div className='grid grid-cols-4 gap-4'>
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
