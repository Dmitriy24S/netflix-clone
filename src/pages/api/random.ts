import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/helpers/prismadb'
import serverAuth from '@/helpers/serverAuth'
// import prismadb from '../../../lib/prismadb'
// import serverAuth from '../../../lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end() // limit to only get request
  }

  try {
    await serverAuth(req, res) // check if logged in, will throw error if not logged in

    const movieCount = await prismadb.movie.count()
    const randomIndex = Math.floor(Math.random() * movieCount)
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    })

    return res.status(200).json(randomMovies[0])
  } catch (error) {
    console.log('random handler error', error)
    return res.status(400).end()
  }
}
