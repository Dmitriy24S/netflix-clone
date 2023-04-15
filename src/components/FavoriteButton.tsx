import axios from 'axios'
import React, { useCallback, useMemo, useState } from 'react'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { User } from '@prisma/client'

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false)

  // if (!currentUser) return null

  const isFavorite = useMemo(() => {
    if (!currentUser) return
    const list = currentUser?.favoriteIds || [] // ! no auto complete -> fix: in hook add type from prisma client

    return list.includes(movieId)
    // }, [currentUser?.favoriteIds, movieId]) // ! 'currentUser' is possibly 'undefined'.
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    if (!currentUser) return

    setIsLoading(true)

    let response

    if (isFavorite) {
      try {
        // response = await axios.delete('/api/favorite', { data: { movieId } }) // ! if use data: -> backend req.body = {}
        response = await axios.delete<User>('/api/favorite', { params: { movieId } })
      } catch (error) {
        console.log('remove favorite error')
        alert(`remove favorite error: ${error}`)
        setIsLoading(false)
        // setTimeout(() => {
        //   setIsLoading(false)
        // }, 1000)
        return
      }
    } else {
      try {
        response = await axios.post<User>('/api/favorite', { movieId })
      } catch (error) {
        console.log('add favorite error', error)
        alert(`add favorite error: ${error}`)
        setIsLoading(false)
        // setTimeout(() => {
        //   setIsLoading(false)
        // }, 1000)
        return
      }
    }

    const updatedFavoriteIds = response.data.favoriteIds

    mutateCurrentUser({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    }) // !

    mutateFavorites() // !

    setIsLoading(false)
    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 1000)
  }, [isFavorite, movieId, currentUser, mutateCurrentUser, mutateFavorites])

  // const Icon = isFavorite ? <AiOutlineCheck /> : <AiOutlinePlus />

  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={toggleFavorites}
      disabled={isLoading}
      // className='group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10'
      className={[
        'group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10',
        isLoading ? 'opacity-50' : '',
      ].join(' ')}
    >
      {/* <MdFavorite /> */}
      {isFavorite ? <AiOutlineCheck /> : <AiOutlinePlus />}
    </button>
  )
}

export default FavoriteButton
