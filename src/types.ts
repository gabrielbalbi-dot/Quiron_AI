export interface PokemonListItem {
  name: string
  url: string
  sprites: { front_default: string }
}

export interface PokemonListResponse {
  count: number
  next: string
  previous: string
  results: PokemonListItem[]
}

export type PokemonDetails = {
  abilities: {
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
  }[]
  base_experience: number
  cries: { latest: string; legacy: string }
  forms: { name: string; url: string }[]
  game_indices: {
    game_index: number
    version: { name: string; url: string }
  }[]
  height: number
  held_items: never[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: {
    move: { name: string; url: string }
    version_group_details: {
      level_learned_at: number
      move_learn_method: { name: string; url: string }
      version_group: { name: string; url: string }
    }[]
  }[]
  name: string
  order: number
  past_abilities: never[]
  past_types: never[]
  species: { name: string; url: string }
  sprites: {
    back_default: string
    back_female: null | string
    back_shiny: string
    back_shiny_female: null | string
    front_default: string
    front_female: null | string
    front_shiny: string
    front_shiny_female: null | string
    other: Record<string, unknown>
    versions: Record<string, unknown>
  }
  stats: {
    base_stat: number
    effort: number
    stat: { name: string; url: string }
  }[]
  types: {
    slot: number
    type: { name: string; url: string }
  }[]
  weight: number
}

export type PokemonSpecies = {
  base_happiness: number
  capture_rate: number
  color: {
    name: string
    url: string
  }
  egg_groups: {
    name: string
    url: string
  }[]
  evolution_chain: {
    url: string
  }
  evolves_from_species: {
    name: string
    url: string
  }
  form_descriptions: unknown[]
  forms_switchable: boolean
  gender_rate: number

  generation: {
    name: string
    url: string
  }
  growth_rate: {
    name: string
    url: string
  }
  habitat: {
    name: string
    url: string
  }
  has_gender_differences: boolean
  hatch_counter: number
  id: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  order: number
  shape: {
    name: string
    url: string
  }
}

export type EvolutionChain = {
  species: { name: string; url: string }
  evolves_to: EvolutionChain[]
}
