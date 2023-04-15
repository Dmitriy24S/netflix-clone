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

    return res.status(200).json(currentUser)
  } catch (error) {
    console.log('current handler error', error)
    return res.status(400).end()
  }
}
