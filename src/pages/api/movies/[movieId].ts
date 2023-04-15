import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/helpers/prismadb'
import serverAuth from '@/helpers/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end() // limit to GET method
  }

  try {
    await serverAuth(req, res)

    const { movieId } = req.query // from [movieId].ts route name/file name

    if (typeof movieId !== 'string') {
      throw new Error('Invalid movie id.')
    }

    if (!movieId) {
      throw new Error('Invalid movie id.')
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!movie) {
      throw new Error('Invalid movie id.')
    }

    return res.status(200).json(movie)
  } catch (error) {
    console.log('movieid handler error', error)
    return res.status(400).end()
  }
}
