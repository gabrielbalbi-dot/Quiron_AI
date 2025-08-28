// src/setupTests.ts
import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { TextEncoder } from 'util'

// Ensure TextEncoder is available globally
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/pokemon-species/1/')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            evolution_chain: {
              url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
            },
          }),
      })
    }
    if (url.includes('/evolution-chain/1/')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            chain: {
              species: { name: 'bulbasaur' },
              evolves_to: [
                {
                  species: { name: 'ivysaur' },
                  evolves_to: [{ species: { name: 'venusaur' }, evolves_to: [] }],
                },
              ],
            },
          }),
      })
    }
    if (url.includes('/pokemon/bulbasaur')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            name: 'bulbasaur',
            abilities: [{ ability: { name: 'overgrow' } }],
            sprites: {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            },
            species: {
              url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
            },
          }),
      })
    }
    if (url.includes('/pokemon?limit=10&offset=0')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
              },
              {
                name: 'ivysaur',
                url: 'https://pokeapi.co/api/v2/pokemon/2/',
              },
            ],
          }),
      })
    }
    return Promise.resolve({
      json: () => Promise.resolve({}),
    })
  }) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})
