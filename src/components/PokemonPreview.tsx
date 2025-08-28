import React from 'react'
import { Link } from 'react-router-dom'
import { PokemonListItem } from '../types'
import { usePokemonDetails } from '../hooks/usePokemonDetails'

type Params = {
  pokemon: PokemonListItem
  offset: number
}

const PokemonPreview: React.FC<Params> = ({ pokemon, offset }) => {
  const { details } = usePokemonDetails(pokemon.name)
  const url = details?.sprites.front_default

  return (
    <div
      key={pokemon.name}
      className="details-list-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-72 flex flex-col justify-between items-center"
      aria-label={`Select ${pokemon.name}`}
    >
      {url ? (
        <img src={url} alt={pokemon.name} className="w-36 h-36 object-cover mb-4" />
      ) : (
        <div className="w-24 h-24 bg-gray-200 mb-4 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
            ></path>
          </svg>
        </div>
      )}
      <h3 className="text-xl font-bold text-center capitalize mb-3">{pokemon.name}</h3>
      <Link
        to={`/pokemon/${pokemon.name}`}
        state={{ offset }}
        className="text-indigo-500 hover:text-indigo-700 hover:underline text-center"
      >
        View details
      </Link>
    </div>
  )
}

export default PokemonPreview
