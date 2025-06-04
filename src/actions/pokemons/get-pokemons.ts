import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginateResponse, PokeAPIPokemon } from '../../infrastructure/interfaces/pokeapi.interface';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const sleep = () => {
  return new Promise( resolve => setTimeout( resolve, 1000 ) );
};

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokeAPIPaginateResponse>( url );
    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });
    const pokemonApiPokemons = await Promise.all(pokemonPromises);
    const pokemons = pokemonApiPokemons.map((item) => PokemonMapper.pokeApiPokemonToEntity(item.data));
    return pokemons;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting pokemons");
  }
};
