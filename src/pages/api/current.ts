import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '../../helpers/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end() // limit this func. to only get requests
  }

  try {
    const { currentUser } = await serverAuth(req, res)

    // ! redundant? - serverAuth throws error if no user?
    // if (!currentUser) {
    //   return res.status(401).end()
    // }

    // console.log('current currentUser', currentUser)
    // {
    //   id: '644979fafb2fe884ab9e8c55',
    //   name: 'Test User',
    //   image: '',
    //   email: 'test1@test.com',
    //   emailVerified: 2023-04-26T19:22:34.616Z,
    //   hashedPassword: '####',
    //   createdAt: 2023-04-26T19:22:34.617Z,
    //   updatedAt: 2023-04-26T19:22:34.617Z,
    //   favoriteIds: []
    // }

    return res.status(200).json(currentUser)
  } catch (error) {
    console.log('current handler error', error)
    return res.status(400).end()
  }
}
