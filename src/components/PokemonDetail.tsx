import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './PokemonDetail.css'
import Loader from './Loader'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { EvolutionChain, PokemonDetails } from '../types'
import { useLocation } from 'react-router-dom'
import { getPokemonEvolutions, getPokemonSpecies } from '../api/pokemon'

interface PokemonDetail {
  name: string
  abilities: { ability: { name: string } }[]
  sprites: { front_default: string }
}

const getEvolutions = async (pokemon: PokemonDetails) => {
  const speciesData = await getPokemonSpecies(pokemon)

  const evolutionData = await getPokemonEvolutions(speciesData)

  const fetchEvolutions = (chain: EvolutionChain) => {
    const evolutions: string[] = [
      chain.species.name,
      ...chain.evolves_to.flatMap((evo) => fetchEvolutions(evo)),
    ]
    return evolutions
  }

  return fetchEvolutions(evolutionData.chain)
}

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const [evolutions, setEvolutions] = useState<string[]>([])

  const { details: pokemon, loading, error } = usePokemonDetails(name)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!pokemon) return

    const fetchPokemonDetails = async () => {
      try {
        const evolutions = await getEvolutions(pokemon)
        setEvolutions(evolutions)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPokemonDetails()
  }, [pokemon])

  if (error) {
    return <div className="loading-container">Error: {error}</div>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="pokemon-detail-container p-6 bg-white rounded shadow-lg w-full max-w-2xl">
        <button
          onClick={() => {
            const offset = location.state?.offset || 0
            navigate(`/?offset=${offset}`)
          }}
          aria-label="Back to Pokemon List"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Back to List
        </button>

        <h1 className="text-3xl font-bold mb-4 text-center">{name}</h1>

        {pokemon && (
          <>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              role="img"
              aria-labelledby="pokemonDetailHeading"
              className="block mx-auto mb-4 w-48 h-48"
            />
            <h3 className="text-xl font-bold mb-4">Abilities:</h3>
            <div>
              <ul className="list-disc pl-5">
                {pokemon.abilities.map((a) => (
                  <li className="mb-1" key={a.ability.name}>
                    {a.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <br />
        {evolutions?.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-2">Evolutions</h3>

            <ul aria-label="Pokemon Evolutions" className="list-disc pl-5">
              {evolutions.map((evo) => (
                <li key={evo} className="mb-1">
                  <Link
                    to={`/pokemon/${evo}`}
                    aria-label={`View details about ${evo}`}
                    className="text-blue-600 hover:underline"
                    state={{ offset: location.state?.offset }}
                  >
                    {evo}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default PokemonDetail
