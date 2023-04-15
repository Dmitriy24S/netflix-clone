import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/helpers/prismadb'
import serverAuth from '@/helpers/serverAuth'
// import prismadb from '../../../helpers/prismadb'
// import serverAuth from '../../../helpers/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end() // limit this func. to only get requests
  }

  try {
    await serverAuth(req, res) // check if logged in, will throw error if not logged in

    const movies = await prismadb.movie.findMany()

    return res.status(200).json(movies)
  } catch (error) {
    console.log('movie handler error', error)
    res.status(400).end()
  }
}
