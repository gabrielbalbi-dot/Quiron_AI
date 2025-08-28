import React from 'react'
import * as api from '../api/pokemon'
import { PokemonDetails } from '../types'

export const usePokemonDetails = (
  name?: string,
): { details: PokemonDetails | undefined; loading: boolean; error: string | null } => {
  const [details, setDetails] = React.useState<PokemonDetails>()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!name) {
      return
    }

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getPokemonDetails(name)

        setDetails(data)
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
  }, [name])

  return { details, loading, error }
}
