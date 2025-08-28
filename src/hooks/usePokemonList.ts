import React from 'react'
import * as api from '../api/pokemon'
import { PokemonListItem } from '../types'

export const usePokemonList = ({
  offset,
}: {
  offset: number
}): {
  pokemonList: PokemonListItem[]
  loading: boolean
  error: string | null
  hasNext: boolean
} => {
  const [pokemonList, setPokemonList] = React.useState<PokemonListItem[]>([])
  const [hasNext, setHasNext] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.fetchPokemonList({ offset })

        setPokemonList(data.results)
        setHasNext(!!data.next)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [offset])

  return { pokemonList, loading, error, hasNext }
}
