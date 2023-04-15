import useSWR from 'swr'

import fetcher from '@/helpers/fetcher'
import { Movie } from '@prisma/client'

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR<Movie>(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  )

  return {
    data,
    error,
    isLoading,
  }
}

export default useMovie
