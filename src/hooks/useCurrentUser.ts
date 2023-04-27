import useSWR from 'swr'

import { User } from '@prisma/client'
import fetcher from '../helpers/fetcher'

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User>('/api/current', fetcher)
  // console.log('useCurrentUser data', data)
  //   {
  //     "id": "644979fafb2fe884ab9e8c55",
  //     "name": "Test User",
  //     "image": "",
  //     "email": "test1@test.com",
  //     "emailVerified": "2023-04-26T19:22:34.616Z",
  //     "hashedPassword": "####",
  //     "createdAt": "2023-04-26T19:22:34.617Z",
  //     "updatedAt": "2023-04-26T19:22:34.617Z",
  //     "favoriteIds": []
  // }
  return { data, error, isLoading, mutate }
}

export default useCurrentUser
