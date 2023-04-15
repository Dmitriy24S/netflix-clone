import { without } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/helpers/prismadb'
import serverAuth from '@/helpers/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // await serverAuth(req) // check if logged in, will throw error if not logged in

    // ADD FAVORITE
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res)

      const { movieId } = req.body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) {
        throw new Error('Invalid movie id.')
      }

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '', // ! Type 'string | null' is not assignable to type 'string | undefined'. Type 'null' is not assignable to type 'string | undefined'.
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      })

      return res.status(200).json(updatedUser)
    }

    // UNFAVORITE
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res)

      // const { movieId } = req.body // ! {} - no movieId
      // const { movieId } = req.query // ! Type 'string | string[] | undefined' is not assignable to type 'string | undefined'.
      // const { movieId } = req.query as string // !  Property 'movieId' does not exist on type 'String'.
      const movieId = req.query.movieId as string

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) {
        throw new Error('Invalid movie id.')
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '', // ! Type 'string | null' is not assignable to type 'string | undefined'. Type 'null' is not assignable to type 'string | undefined'.
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      })

      return res.status(200).json(updatedUser)
    }

    // error out if not post/delete request:
    return res.status(405).end()
  } catch (error) {
    console.log('favorite handler error', error)
    return res.status(400).end()
  }
}
