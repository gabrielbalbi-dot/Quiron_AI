import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSearchParams } from 'react-router-dom'
import { usePokemonList } from '../hooks/usePokemonList'
import PokemonList from './PokemonList'
import PokemonPreview from './PokemonPreview'

// Mocking modules and components
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))
jest.mock('../hooks/usePokemonList')
jest.mock('./PokemonPreview', () => jest.fn(() => null))
jest.mock('./Loader', () => jest.fn(() => <div>Loading...</div>))

describe('📋 PokemonList 📋', () => {
  let mockSearchParams = new URLSearchParams()
  const mockSetSearchParams = jest.fn((newParams) => {
    mockSearchParams = new URLSearchParams(newParams)
    // Optionally, trigger any effects or re-renders as needed
  })
  beforeEach(() => {
    // Reset search params and mocks before each test
    mockSearchParams = new URLSearchParams({ offset: '0' })
    mockSetSearchParams.mockClear()
    ;(useSearchParams as jest.Mock).mockReturnValue([mockSearchParams, mockSetSearchParams])
    ;(PokemonPreview as jest.Mock).mockImplementation(({ pokemon }) => <div>{pokemon.name}</div>)
  })

  it('🔄 displays loader when loading', () => {
    ;(usePokemonList as jest.Mock).mockReturnValue({ loading: true })
    render(<PokemonList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('❌ displays error message on error', () => {
    ;(usePokemonList as jest.Mock).mockReturnValue({ error: 'Test Error' })
    render(<PokemonList />)
    expect(screen.getByText('Error: Test Error')).toBeInTheDocument()
  })

  it('👀 renders PokemonPreview for each pokemon', () => {
    ;(usePokemonList as jest.Mock).mockReturnValue({
      pokemonList: [
        { name: 'Bulbasaur', url: 'url1' },
        { name: 'Charmander', url: 'url2' },
      ],
      loading: false,
    })
    render(<PokemonList />)
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('Charmander')).toBeInTheDocument()
  })

  it('⏭️ navigates to next and previous pages', () => {
    ;(usePokemonList as jest.Mock).mockReturnValue({
      pokemonList: [],
      loading: false,
      hasNext: true,
    })
    render(<PokemonList />)
    fireEvent.click(screen.getByLabelText('Next Page'))
    expect(mockSetSearchParams).toHaveBeenCalledWith({ offset: '10' })
    fireEvent.click(screen.getByLabelText('Previous Page'))
    expect(mockSetSearchParams).toHaveBeenCalledWith({ offset: '10' })
  })
})
