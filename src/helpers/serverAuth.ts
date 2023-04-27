import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
// import { getSession } from 'next-auth/react'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prismadb from './prismadb'

// const serverAuth = async (req: NextApiRequest) => {
// const session = await getSession({ req })
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  // console.log('serverAuth session', session)
  // serverAuth session {
  //   user: { name: 'Test User', email: 'test1@test.com', image: '' },
  //   expires: '2023-05-26T20:38:35.564Z'
  // }

  if (!session?.user?.email) {
    throw new Error('Not signed in.')
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) {
    throw new Error('Not signed in.')
  }

  // console.log('serverAuth currentUser', currentUser)
  // serverAuth currentUser {
  //   ...
  // }

  // current currentUser {
  //  ...
  // }
  return { currentUser }
}

export default serverAuth
